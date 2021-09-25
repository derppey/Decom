import Gun from 'gun'
import 'gun/sea'
import 'gun/axe'

export const db = Gun()

export const user = db.user().recall({ sessionStorage: true })

db.on('auth', async (e) => {
  const alias = await user.get('alias')
  console.log(`Logged in as ${alias}`)
})
