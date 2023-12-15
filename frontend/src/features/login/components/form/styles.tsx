import {Box, Button, styled, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

export const FormWrapper = styled(Box)`
  padding: 16px;
  margin-top:10em;
  height: auto;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  overflow: hidden;
`

export const FormIcon = styled(Box)`
  position: relative;
  margin: 1em;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  color: rgb(250, 250, 251);
  background-color: rgb(189, 189, 189);
`

export const FormInputsBlock = styled(Box)`
  width: 300px;
  gap: 18px;
`

export const Input = styled(TextField)`
width: 100%;
  margin-bottom: 18px;
`

export const SubmitBtn = styled(Button)`
width:100%;
  margin-top: 20px;
`

export const Error = styled(Typography)`
  text-align:center;
  font-size: 10px;
  margin:0;
  padding:0;
  color:red;
`
