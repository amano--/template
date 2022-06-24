// import React from 'react'
import { Button, Input } from 'react-daisyui'

export function SampleForm() {
  return (
    <div>
      <h1>Sample Form</h1>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your name?</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <label className="label">
          <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <Input color="primary" value={'hoge hoge'} />
        <Button color="primary">Click me!</Button>
        <Button color="secondary">Click me!</Button>
      </div>
    </div>
  )
}
