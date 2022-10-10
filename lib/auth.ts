import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'
import primsa from './prisma'

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { MUSIC_B0X_ACCESS_TOKEN: token } = req.cookies

        if (token) {
            let user

            try {
                const { id } = jwt.verify(token, 'hello')
                user = await prisma.user.findUnique({
                    where: { id },
                })

                if (!user) {
                    throw new Error('Not a real user')
                }
            } catch (error) {
                res.status(401)
                res.json({ error: 'Not Authorized' })
                return
            }

            return handler(req, res, user)
        }

        res.status(401)
        res.json({ error: 'Not Authorized' })
    }
}
