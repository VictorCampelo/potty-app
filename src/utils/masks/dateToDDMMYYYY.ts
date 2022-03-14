import moment from 'moment'

const formatDateToDDMMYYYY = (date: any) => moment(date).format('DD/MM/YYYY')

export default formatDateToDDMMYYYY
