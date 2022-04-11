/* eslint-disable react/no-children-prop */
import { 
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Stack,
    Collapse,
    Box,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai"
import { useState, useEffect, useRef } from 'react'

export default function Search(props) {
    const { isOpen, onToggle } = useDisclosure()
    const [ track, setTrack ] = useState('')
    const [ lyrics, setLyrics ] = useState('')
    const cancelRef = useRef()
    let paras = 0
    function handleChange(e) {
        setTrack(e.target.value.split(',').map(item => item.trim()))
        // console.log(track)
    }
    async function handleClick() {
        if (track.length >= 2) {
            await fetch(`https://lyrist.vercel.app/api/${encodeURIComponent(track[0])}/${encodeURIComponent(track[1])}`).then(
            res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    setLyrics('No lyrics found')
                    return ""
                }
            }
            ).then(
                data => {
                    if (data !== "") {
                        setLyrics(data.lyrics)
                    }
                }
            )
            if (lyrics === "") {
                onToggle()
            }
        } else {
            alert('Please Enter Both Track name and Artist Name separated by comma.')
        }
    }
    async function handleEnter(e) {
        if (e.key === 'Enter') {
            if (track.length >= 2) {
                await fetch(`https://lyrist.vercel.app/api/${encodeURIComponent(track[0])}/${encodeURIComponent(track[1])}`).then(
                res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        setLyrics('No lyrics found')
                        return ""
                    }
                }
                ).then(
                    data => {
                        if (data !== "") {
                            setLyrics(data.lyrics)
                        }
                    }
                )
                if (lyrics === "") {
                    onToggle()
                }
            } else {
                alert('Please Enter Both Track name and Artist Name separated by comma.')
            }
        }
    }
    return (
        <Stack flex spacing={4} flexDirection={'column'} className='lyrics-main'>
            <InputGroup className='lyrics-input'>
                <InputLeftElement children={<AiOutlineSearch />} />
                <Input type="text" placeholder="track name, track artist" onChange={handleChange} width={'80%'} onKeyDown={handleEnter} />
                <Button onClick={handleClick} marginLeft={'15px'} width={'20%'}>Search</Button>
            </InputGroup>
            <Collapse in={isOpen} animateOpacity className='lyrics-content'>
                    <Box
                        p='20px'
                        color='white'
                        bg='gray.100'
                        width={'100%'}
                        shadow='md'
                        className='lyrics'
                    >
                        {lyrics.split('\n\n').map(paragraph =>
                            <Text key={`p${paras++}`} marginBottom={'10px'} color='black'>
                                {paragraph.split('\n').reduce((total, line) => [total, <br key={`b${paras++}`}/>, line])}
                            </Text>
                        )}
                    </Box>
            </Collapse>
        </Stack>
    )
}