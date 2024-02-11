import React from 'react'
import {createRoot} from 'react-dom/client'
import '../assets/tailwind.css'

const test =(
<>
<h2 className="text-3xl text-green-500">Coming Soon More Options ...</h2>
</>
)

const container =document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(test)