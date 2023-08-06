export function generateRandomString(length: number): string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomStr = '';

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomStr += characters.charAt(randomIndex);
    }

    return randomStr;
}