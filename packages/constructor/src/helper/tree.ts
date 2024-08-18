import { A, N, S, B, ULID, } from "src/types/base"
import { Component } from "src/types/component"
import { Queue } from "data-footstone"

let clog = console.log


// 基于js的面向对象的思想做一棵树
interface NodePropotype<T> {
    isTop: () => B
    isRoot: () => B
    isTail: () => B
    isBottom: () => B
    toArray: () => T[]
    allChildren: () => T[]
}
interface Node<T> extends NodePropotype<T>{
    prev: Node<T> | null
    next: Node<T> | null
    parent: Node<T> | null
    children: {
        [k: S]: Node<T>
    },
    mountPosition: S,
    value: T,
}
interface Tree<T> {
    root: Node<T> | null
    find: (ulid: ULID) => Node<T> | undefined
    mountRoot: (component: T) => Node<T>
    mountPrev: (component: T, ulid: ULID) => Node<T> | undefined,
    mountNext: (component: T, ulid: ULID) => Node<T> | undefined,
    mountChild: (component: T, ulid: ULID, key: S) => Node<T> | undefined,
    unmount: (ulid: ULID) => Node<T> | undefined,
    // lastNode: Node<T> | null
}
type NC = Node<Component>
type TC = Tree<Component>
type ToOption = ToOptionPrev | ToOptionNext | ToOptionChild
interface ToOptionUlid {
    ulid: ULID
}
interface ToOptionPrev extends ToOptionUlid {
    mountPosition: 'prev'
}
interface ToOptionNext extends ToOptionUlid {
    mountPosition: 'next'
}
interface ToOptionChild extends ToOptionUlid {
    mountPosition: 'child'
    key: S
}

let nodePropotype: NodePropotype<Component> = Object.create({}, {
    isTop: {
        value: function () {
            return !this.prev
        }
    },
    isRoot: {
        value: function () {
            return !this.prev && !this.parent
        }
    },
    isTail: {
        value: function () {
            return !this.next
        }
    },
    isBottom: {
        value: function () {
            return !Object.values(this.children).length
        }
    },
    toArray: {
        value: function () {
            let arr: Component[] = []
            let cur = this
            while (cur) {
                arr.push(cur.value)
                cur = cur.next
            }
            return arr
        }
    },
    allChildren: {
        value: function () {
            let arr: Component[] = []
            let curNode = this
            let q = new Queue<Node<Component>>();
            (Array.from(Object.values(curNode.children)) as Node<Component>[]).forEach(nodeItem => {
                q.enqueue(nodeItem)
                let nodeNext = nodeItem.next
                while (nodeNext) {
                    q.enqueue(nodeNext)
                    nodeNext = nodeNext.next
                }
            })
            while (q.size()) {
                let curNode = q.dequeue()
                Array.from(Object.values(curNode.children)).forEach(nodeItem => {
                    q.enqueue(nodeItem)
                    let nodeNext = nodeItem.next
                    while (nodeNext) {
                        q.enqueue(nodeNext)
                        nodeNext = nodeNext.next
                    }
                })
                arr.push(curNode.value)
            }
            return arr
        }
    }
})
let createNode = <T>(v: T): Node<T> => {
    return Object.create(nodePropotype, {
        prev: {
            writable: true,
            value: null
        },
        next: {
            writable: true,
            value: null
        },
        parent: {
            writable: true,
            value: null
        },
        children: {
            writable: true,
            value: {}
        },
        mountPosition: {
            writable: true,
            value: ''
        },
        value: {
            writable: true,
            value: v
        },
    })
}
let treePrototype = Object.create({}, {
    // 根据特定ulid取得节点
    find: {
        writable: false,
        enumerable: true, // 是否可枚举，即是否私有的。
        configurable: true,
        value: function (ulid: ULID) {
            let root = (this as Tree<Component>).root
            let q = new Queue<NC>()
            if (root) {
                q.enqueue(root)
            }
            let res: NC | undefined
            while (!q.isEmpty()) {
                let cur = q.dequeue()
                if (cur.value.ulid === ulid) {
                    res = cur
                    break;
                }
                cur.next ? q.enqueue(cur.next) : null
                Object.values(cur.children).forEach(item => {
                    q.enqueue(item)
                })
            }
            return res
        }
    },
    // 挂载根节点
    mountRoot: {
        value: function (component: Component) {
        let node = createNode(component);
        // clog('this', this);
        (this as TC).root = node
    }},
    // 挂载前节点。在指定node.value.ulid的节点前挂载节点
    // 返回挂载成功的节点
    mountPrev: {
        value: function (component: Component, ulid: ULID) {
            let node: NC | undefined = this.find(ulid)
            if (node) {
                let newNode = createNode(component)
                let prevNode = node.prev
                if (prevNode) {
                    prevNode.next = newNode
                    newNode.prev = prevNode
                    node.prev = newNode
                    newNode.next = node
                } else {
                    newNode.next = node
                    node.prev = newNode
                    if (node.isRoot()) {
                        this.root = newNode
                    } else {
                        if (node.isTop()) {
                            node.parent!.children[node.mountPosition] = newNode
                        }
                    }
                }
                newNode.parent = node.parent
                return newNode
            } else {
                return undefined
            }
        }
    },
    // 挂载后节点。在指定node.value.ulid的节点后挂载节点
    // 返回挂载成功的节点
    mountNext: {
        value: function(component: Component, ulid: ULID) {
            let node: NC | undefined = this.find(ulid)
            // clog('要挂载节点的节点' , node)
            if (node) {
                let newNode = createNode(component)
                let nextNode = node.next
                if (nextNode) {
                    nextNode.prev = newNode
                    newNode.next = nextNode
                    node.next = newNode
                    newNode.prev = node
                } else {
                    node.next = newNode
                    newNode.prev = node
                }
                newNode.parent = node.parent
                return newNode
            } else {
                return undefined
            }
        }
    },
    // 挂载子节点。在指定node.value.ulid的节点上前挂载指定位置的子节点
    // 返回挂载成功的节点
    mountChild: {
        value: function(component: Component, ulid: ULID, key: S) {
            let node: NC | undefined = this.find(ulid)
            if (node) {
                let newNode = createNode(component)
                node.children[key] = newNode
                newNode.parent = node
                newNode.mountPosition = key
                return newNode
            } else {
                return undefined
            }
        }
    },
    // 卸载指定ulid的节点，包含其子节点。不影响其前后节点
    // 返回被卸载的节点。
    unmount: {
        value: function (ulid: ULID): Node<Component> | undefined {
            let node: NC | undefined = this.find(ulid)
            if (node) {
                if (node.isRoot()) {
                    this.root = node.next
                    if (this.root) {
                        this.root.prev = null
                    }
                } else {
                    if (node.isTop()) {
                        if (node.next) {
                            node.parent!.children[node.mountPosition] = node.next
                            node.next.prev = null
                        } else {
                            delete node.parent!.children[node.mountPosition]
                        }
                    } else {
                        node.prev!.next = node.next
                        if (node.next) {
                            node.next.prev = node.prev
                        }
                    }
                }
                return node
            } else {
                return undefined
            }
        }
    },
    // 把fromUlid的节点移动到toUlid节点的指定位置（prev/next/child&key）
    // 返回移到后的节点
    move: {
        value: function(fromUlid: ULID, toOption: ToOption): NC | false {
            let fromNode: NC | undefined = this.find(fromUlid)
            let toNode: NC | undefined = this.find(toOption.ulid)
            if (!fromNode || !toNode) {
                return false
            } else {
                this.unmount(fromUlid)
                let newNode: NC
                switch(toOption.mountPosition) {
                    case 'prev':
                        newNode = this.mountPrev(fromNode.value, toOption.ulid) as NC
                        break;
                    case 'next':
                        newNode = this.mountNext(fromNode.value, toOption.ulid) as NC
                        break;
                    case 'child':
                        newNode = this.mountChild(fromNode.value, toOption.ulid, toOption.key) as NC
                        break;
                }
                return newNode
            }
        }
    },
    // // 顶级最后的节点
    // lastNode: {
    //     value: function() {
    //         let curNode = this.root
    //         if (curNode) {
    //             let nextNode = curNode.next
    //             while(nextNode) {
    //                 curNode = nextNode
    //                 nextNode = nextNode.next
    //             }
    //             return curNode
    //         } else {
    //             return null
    //         }
    //     }
    // }
})

let createTree = <T>(): Tree<T> => {
    return Object.create(treePrototype, {
        root: {
            writable: true,
            value: null
        }
    })
}
export {
    createTree,
    createNode,
}
export type {
    Node, Tree,
}