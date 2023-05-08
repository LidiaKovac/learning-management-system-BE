import bcrypt from "bcrypt"
export const checkPassword = async (sent: string, db: string): Promise<boolean> => {
    const isCorrect = await bcrypt.compare(
        sent,
        db
    )
    return isCorrect
}