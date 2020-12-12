declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module 'globby!/*.@(svg)' {
  const icons: Record<string, string>
  export default icons
}

declare module '*.scss' {

  const scss: Record<string, string>
  export default scss;
}


