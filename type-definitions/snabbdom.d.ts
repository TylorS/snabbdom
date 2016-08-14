export interface VNodeData {
  // modules - use any because Object type is useless
  props?: any;
  attrs?: any;
  class?: any;
  style?: any;
  dataset?: any;
  on?: any;
  hero?: any;
  // end of modules
  hook?: Hooks;
  key?: string | number;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: Array<any>; // for thunks
}

export interface VNode {
  sel: string | undefined;
  data?: VNodeData | undefined;
  children?: Array<VNode | string> | undefined;
  elm?: HTMLElement | Text | undefined;
  text?: string | undefined;
  key?: string | number | undefined;
}

export interface ThunkData extends VNodeData {
  fn: () => VNode;
  args: Array<any>;
}

export interface Thunk extends VNode {
  data: ThunkData;
}

export type PreHook = () => any;
export type InitHook = (vNode: VNode) => any;
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any;
export type InsertHook = (vNode: VNode) => any;
export type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any;
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any;
export type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any;
export type DestroyHook = (vNode: VNode) => any;
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any;
export type PostHook = () => any;

export interface Hooks {
  pre?: PreHook;
  init?: InitHook;
  create?: CreateHook;
  insert?: InsertHook;
  prepatch?: PrePatchHook;
  update?: UpdateHook;
  postpatch?: PostPatchHook;
  destroy?: DestroyHook;
  remove?: RemoveHook;
  post?: PostHook;
}

export interface Module {
  pre?: PreHook;
  create?: CreateHook;
  update?: UpdateHook;
  destroy?: DestroyHook;
  remove?: RemoveHook;
  post?: PostHook;
}

export interface SnabbdomAPI<T> {
  createHTMLElement(tagName: string): T;
  createHTMLElementNS(namespaceURI: string, qualifiedName: string): T;
  createTextNode(text: string): T;
  insertBefore(parentNode: T, newNode: T, referenceNode: T): void;
  removeChild(node: T, child: T): void;
  appendChild(node: T, child: T): void;
  parentNode(node: T): T;
  nextSibling(node: T): T;
  tagName(node: T): string;
  setTextCtent(node: T, text: string): void;
}

export interface HyperscriptFn {
  (sel: string): VNode
  (sel: string, data: VNodeData): VNode
  (sel: string, children: Array<string | VNode>): VNode
  (sel: string, data: VNodeData, children: Array<string | VNode>): VNode
}

export interface ThunkFn {
  <T1>(selector: string, key: string | number, render: (state1: T1) => VNode, state: T1): Thunk
  <T1, T2>(selector: string, key: string | number, render: (state1: T1, state2: T2) => VNode, state: T1, state2: T2): Thunk
  <T1, T2, T3>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3) => VNode, state: T1, state2: T2, state3: T3): Thunk
  <T1, T2, T3, T4>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4) => VNode, state: T1, state2: T2, state3: T3, state4: T4): Thunk
  <T1, T2, T3, T4, T5>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5): Thunk
  <T1, T2, T3, T4, T5, T6>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6): Thunk
  <T1, T2, T3, T4, T5, T6, T7>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7): Thunk
  <T1, T2, T3, T4, T5, T6, T7, T8>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8): Thunk
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8, state9: T9) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8, state9: T9): Thunk
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(selector: string, key: string | number, render: (state1: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8, state9: T9, state10: T10) => VNode, state: T1, state2: T2, state3: T3, state4: T4, state5: T5, state6: T6, state7: T7, state8: T8, state9: T9, state10: T10): Thunk
  (selector: string, key: string | number, render: (...state: any[]) => VNode, ...state: any[]): Thunk
}

declare module "snabbdom" {
  export interface PatchFunction {
    (oldVNode: VNode, vnode: VNode): VNode;
  }

  export function init(modules: Object, api?: SnabbdomAPI<any>): PatchFunction;
}

declare module "snabbdom/h" {
  const h: HyperscriptFn
  export = h
}

declare module "snabbdom/vnode" {
  const vnode: (sel: string,
                data: VNodeData,
                children: Array<VNode | string>,
                text: string,
                elm: any) => VNode;
  export = vnode;
}

declare module "snabbdom/is" {
  export function array(x: any): boolean;
  export function primitive(x: any): boolean;
}

declare module "snabbdom/thunk" {
  const thunk: ThunkFn;
  export = thunk;
}

declare module "snabbdom/htmldomapi" {
  const api: SnabbdomAPI<HTMLElement | Text>;
  export = api;
}

declare module "snabbdom/modules/class" {
  const ClassModule: Module;
  export = ClassModule;
}

declare module "snabbdom/modules/props" {
  const PropsModule: Module;
  export = PropsModule;
}

declare module "snabbdom/modules/attributes" {
  const AttrsModule: Module;
  export = AttrsModule;
}

declare module "snabbdom/modules/eventlisteners" {
  const EventsModule: Module;
  export = EventsModule;
}

declare module "snabbdom/modules/hero" {
  const HeroModule: Module;
  export = HeroModule;
}

declare module "snabbdom/modules/style" {
  const StyleModule: Module;
  export = StyleModule;
}

declare module "snabbdom/modules/dataset" {
  const DatasetModule: Module;
  export = DatasetModule;
}

