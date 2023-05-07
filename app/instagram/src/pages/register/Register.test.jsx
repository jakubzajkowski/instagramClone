import { expect, it,describe } from 'vitest'
import {render, fireEvent, screen} from '@testing-library/react'
import Register from './Register'

describe('test register',()=>{
    it('test render',()=>{
        render(<Register/>)
        const fullName = screen.getByPlaceholderText('Full Name')
        expect(screen.getByText(/Next/i)).toBeDefined()
    })
})