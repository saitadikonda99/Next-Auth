import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server' 
import { cookies } from 'next/headers'


export const GET = async (req: NextRequest) => {

    try {

        const cookieStore = cookies()
        const JWT = cookieStore.get('jwt')
        console.log(JWT)
        
        // delete the refresh token from the database
        if(JWT?.value !== '') {
            await pool.query(
                `UPDATE users
                 SET refreshToken = null
                 WHERE refreshToken = ?
                 `, [JWT?.value]
            )
        } else {
            return NextResponse.json({message: 'User not logged in', status: 401})
        } 

        // delete the refresh token from the cookies
        cookies().set('jwt', '')


        // redirect to login page
        return NextResponse.json({message: 'User logged out', status: 200})
        
    } catch (error) {
        return NextResponse.json({message: error})
    }
}