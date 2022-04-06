export default interface Email {
    id: number
    html: string
    subject: string
    text: string
    from: string
    to: string
    address_id: number
}