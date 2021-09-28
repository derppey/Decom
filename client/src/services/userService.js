import Gun from 'gun';
import 'gun/sea';
import 'gun/axe';
const rel_ = Gun.val.rel._;  // '#'
const node_ = Gun.node._;  // '_'
Gun.chain.unset = function (node) {
  this.put( { [node[node_].put[node_][rel_]]:null} );
  return this;
};

export const db = Gun({
  peers: [
    'https://decom-db.herokuapp.com/gun',
  ]
}).get('xcbvbvcbvc');

export const user = db.user().recall({ sessionStorage: true });
db.on('auth', async () => {
  const alias = await user.get('alias');
  console.log(`Logged in as ${alias}`);
});
