import bcrypt from "bcrypt"

export const get_token_from_cookies = (cookies: String) => {
    const arr = cookies.split(";") // splits in an array of string, each containing a cookie
    const token = arr[0].split("=")
    return token[1]
}

export const checkPassword = async (sent: string, db: string): Promise<boolean> => {
    const isCorrect = await bcrypt.compare(
        sent,
        db
    )
    return isCorrect
}

export const getMulterFields = (modelAtt: { [x: string]: any }, exclude: Array<String> = []) => {
    //using any because it doesn't really matter
    if(!modelAtt) return []
    console.log(Object.keys(modelAtt))
    const keysToFilter = ["id", "createdAt", "updatedAt", ...exclude]
    return Object.keys(modelAtt).filter(key => !keysToFilter.includes(key)).map(key => ({ name: key }))
}