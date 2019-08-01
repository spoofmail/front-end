
function generateRandomName(length) {
    let a = "abcdefghijklmnopqrstuvwxyz"

    let name = ""

    for (let i = 0; i < length; i++) {
        name += a.charAt(Math.random() * a.length);
    }

    return name;
};

export const addressesList = [
    { id: 0, user_id: 0, name: "Google", email: `${generateRandomName(16)}@gmail.com` },
    { id: 1, user_id: 1, name: "Twitter", email: `${generateRandomName(16)}@gmail.com` },
]

export const emailData = [
    { address_id: 0, from: "google@gmail.com", subject: "Verify Email", html: `<div><p style="color:red;">Hello</p></div>` },
    { address_id: 1, from: "tim@gmail.com", subject: "Not " },
    { address_id: 1, from: "tim@twitter.com", subject: "Hello2 " },
    { address_id: 1, from: "john@google.com", subject: "Hello3 " },
]
