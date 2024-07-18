// src/mocks/handlers.js
import { rest } from 'msw'
const baseUrl = 'http://10.0.2.2:3001/'
export const handlers = [
    // Handles a POST /login request
    rest.post(`${baseUrl}/auth/login`, (req, res, ctx) => {
        console.log(req.body)
        return res(
            ctx.status(200),
            ctx.json({
                status: "login success",
                token: 'some token'
            })
        )
    }),

    // Handles a GET /user request
    rest.get('/auth', null),
]