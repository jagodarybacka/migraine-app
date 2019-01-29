import React from 'react'
import styled from 'styled-components'

import Button from '../components/Button'
import Logo from '../components/Logo'


const FormComp = styled.form`
  text-align: center;
`

const FormSimple = (props) => {
  const { name, submit, children, onSubmit, active } = props;

  return (
    <FormComp method="POST" onSubmit={onSubmit} noValidate="noValidate">
      <h1>{name}</h1>
      <Logo size="80px" margin="0 0 10% 0"/>
      <div>
        {children}

        {active === true ? (
          <Button type="submit" text={submit} disabled={false} />
        ): (
          <Button type="submit" text={submit}  disabled={true} />
        )}
      </div>
    </FormComp>
  )
}

FormSimple.defaultProps = {
  active: true,
}

export default FormSimple
