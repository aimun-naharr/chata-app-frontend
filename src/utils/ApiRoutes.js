import axios from "axios";

const baseUrl='http://localhost:8000'
export const registerUrl=`${baseUrl}/api/auth/register`
export const loginUrl=`${baseUrl}/api/auth/login`
export const setAvatarUrl=`${baseUrl}/api/auth/setAvatar`