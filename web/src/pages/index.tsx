import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarImg from '../assets/users-avatar-example.png'
import checkIconImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number,
  guessCount: number,
  userCount: number,
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } = await response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso o codigo foi copiado para area de transferencia!')
      setPoolTitle('')
    } catch (error) {
      console.log(error)
      alert('Falha ao criar ao bolão, tente novamente!')
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
     <main>
      <Image src={logoImg} alt="NLW Copa"/>
      <h1 className='mt-[60px] text-white text-5xl font-bold leading-tight'>
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>
      <div className='mt-10 flex gap-2 items-center'>
        <Image src={usersAvatarImg} alt="Images de pessoas"/>
        <strong className='text-gray-100 text-xl'>
          <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando 
        </strong>
      </div>
      <form onSubmit={createPool} className='mt-10 flex gap-2'>
        <input 
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}
          type="text" 
          required 
          placeholder='Qual nome do seu bolão?'
        />
        <button
          className='bg-yellow-500 px-6 py-4 rounded text-sm font-bold text-gray-900 hover:bg-yellow-700'
          type='submit' 
          >
          CRIAR MEU BOLÃO
        </button>
      </form>
      <p className='text-gray-300 mt-4 text-sm leading-relaxed'>
        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
      </p>
      <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Image src={checkIconImg} alt="Icone de Check"/>
          <div className='text-gray-100 flex flex-col'>
            <span className='font-bold text-2xl'>+{props.poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>

        <div className='w-px h-14 bg-gray-600'/>

        <div className='flex items-center gap-6'>
          <Image src={checkIconImg} alt="Icone de Check"/>
          <div className='text-gray-100 flex flex-col'>
            <span className='font-bold text-2xl'>+{props.guessCount}</span>
            <span>Palpites enviados</span>
          </div>
        </div>
      </div>
     </main>

     <Image src={appPreviewImage} alt="Dois Celulares Exibindo uma previda aplicação" quality={100}/>
    </div>
    
  )
}

export const getStaticProps = async () => {
  const [poolCountResoponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResoponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },

    revalidate: 1000,
  }
}