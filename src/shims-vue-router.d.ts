import "vue-router"
declare module "vue-router"{
  interface _RouteRecordBase {
    noShowingChildren: boolean,
     hidden: boolean
  }
}