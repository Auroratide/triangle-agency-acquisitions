import { MissionDatabase as MissionDbClass } from "./MissionDatabase"

export * from "./Id"
export type { DocumentIdAndName } from "./MissionDatabase"
export const MissionDatabase = new MissionDbClass()
