import Gun from 'gun';
import 'gun/sea';
import 'gun/axe';
export const db = Gun({
  peers: [
    'https://decom-db.herokuapp.com/gun'
  ]
}).get('root');


export const user = db.user().recall({ sessionStorage: true });

db.on('auth', async () => {
  const alias = await user.get('alias');
  console.log(`Logged in as ${alias}`);
});
