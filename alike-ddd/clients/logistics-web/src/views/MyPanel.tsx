import { Component } from 'solid-js'
import Header from '../components/Header'

const MyPanel: Component = () => {
  return (
    <>
      <Header title="MyPanel" />
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              MyPanel <br class="xl:hidden" />{' '}
            </h2>
          </div>
        </div>
      </main>
    </>
  )
}

export default MyPanel
