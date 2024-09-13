// utils
import { Injectable, signal, Inject, } from '@angular/core';
// type
import type { WritableSignal } from '@angular/core';
type a = any

export class ShareSignal<T> {
  private data: WritableSignal<T>
  constructor(
  initValue: T) {
    this.data = signal<T>(initValue)
  }
  set(value: T) {
    this.data.set(value)
  }
  get() {
    return this.data()
  }
}
