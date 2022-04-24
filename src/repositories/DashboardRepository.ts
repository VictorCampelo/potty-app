import Http from '@/services/Http'

export default class DashboardRepository extends Http {
  mostSolds(): any {
    return this.get('dashboard/mostSolds')
  }

  lastSolds(): any {
    return this.get('dashboard/lastSolds')
  }

  lastFeedbacks(): any {
    return this.get('dashboard/lastFeedbacks')
  }

  amountSoldProducts(): any {
    return this.get('dashboard/amountSoldProducts')
  }

  income(): any {
    return this.get('dashboard/income')
  }

  getViewer(): any {
    return this.get('dashboard/getviewer')
  }
}
