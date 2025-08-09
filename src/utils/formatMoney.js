

export default function formatMoney(price){
    let formatter=new Intl.NumberFormat('en-IN')
    return formatter.format(price)
}