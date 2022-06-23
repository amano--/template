import { Component } from 'solid-js'

export interface HeaderProps {
  title: string
}

export const Header: Component<HeaderProps> = (props) => {
  return (
    <header class="bg-red-400 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{props.title} AAA</h1>
      </div>
    </header>
  )
}

// export default Header;
