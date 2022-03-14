import Http from '@/services/Http'
import type { FindPlanResponse } from '@/@types/requests'

export default class PlanRepository extends Http {
  findPlan(name: string) {
    return this.get<FindPlanResponse>(`/plans/find/${name.toLowerCase()}`)
  }
}
