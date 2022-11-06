import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarImg from '../assets/users-avatar-example.png'
import checkIconImg from '../assets/icon-check.svg'

// interface HomeProps {
//   count: number,
// }

export default function Home() {

  return (
    <>
     <main>
      <Image src={logoImg} alt="NLW Copa"/>
      <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      <div>
        <Image src={usersAvatarImg} alt="Images de pessoas"/>
        <strong><span>+12.592</span> pessoas já estão usando </strong>
      </div>
      <form>
        <input type="text" required placeholder='Qual nome do seu bolão?'/>
        <button type='submit'>CRIAR MEU BOLÃO</button>
      </form>
      <p>
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
      </p>
      <div>
        <div>
          <Image src={checkIconImg} alt="Icone de Check"/>
          <div>
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div>
          <Image src={checkIconImg} alt="Icone de Check"/>
          <div>
            <span>+192.847</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </div>
     </main>

     <Image src={appPreviewImage} alt="Dois Celulares Exibindo uma previda aplicação" quality={100}/>
    </>
    
  )
}

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()

//   console.log(data)

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }
