export default interface Email {
    id: string
    html: string
    subject: string
    text: string
    from: string
    to: string
    address_id: string
    user_id: string
}