import React, { FormEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import { noteData } from '../App'

type NoteFormProps = {
    onSubmit:  (note: noteData) => void
}
const NoteForm = ({ onSubmit } : NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null);

    function handleSubmit(e: FormEvent){
        e.preventDefault()
        // console.log(titleRef.current?.value);
        // console.log(markdownRef.current?.value);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required as="textarea" ref={markdownRef} rows={15} />
                </Form.Group>
                <Stack direction='horizontal' gap={4} className='justify-content-end'>
                    <Link to=" ..">
                        <Button type='submit' variant='primary'>Save</Button>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm
