// src/inventoryLogin.jsx
import LoginForm from './LoginForm'
import Header from './Header'

function InventoryLogin() {
 return (
  <div className="App">
   <Header /> {/* Persistent header */}
   <div style={styles.content}>
    <LoginForm />
   </div>
  </div>
 )
}

const styles = {
 content: {
  paddingTop: '20px', // Spacing from the header
 },
}
export default InventoryLogin
