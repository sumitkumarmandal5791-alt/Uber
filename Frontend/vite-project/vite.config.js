import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})


// email
// : 
// "name@gmail.com"
// fullname
// : 
// {firstname: "first", lastname: "name"}
// firstname
// : 
// "first"
// lastname
// : 
// "name"
// password
// : 
// "Name@123"





