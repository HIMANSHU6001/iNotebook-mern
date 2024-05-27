import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik';
import UserContext from '../context/notes/userContext';

import noteContext from '../context/notes/noteContext';

function AddModal(props) {

    const contextNote = useContext(noteContext);
    const userContext = useContext(UserContext);
    const { notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes } = contextNote;
    const { currentTags } = userContext

    const validateTitle = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (value.length < 2) {
            error = 'Title too short';
        } else if (value.length > 50) {
            error = 'Title too long';
        }
        return error;
    }

    const validateDescription = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (value.length <= 5) {
            error = 'Description too short';
        }
        return error;
    }

    const validateTag = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (!Object.keys(currentTags).includes(value)) {
            error = 'Select a valid tag';
        }
        return error;
    }

    return (
        <div tabIndex="-1" aria-hidden="true" hidden={!(props.isAddModalOpen)} className=" w-full fixed z-50 top-5" >
            <div className="relative mx-auto w-full max-w-md max-h-full" >
                <div className="relative bg-white rounded-lg shadow border-2 border-gray-300">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-primary">
                            Create New Note
                        </h3>
                        <button onClick={() => { props.setIsAddModalOpen(false); }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span onClick={() => { props.setIsAddModalOpen(false); }} className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <Formik
                        initialValues={{
                            title: '',
                            tag: '',
                            description: '',
                        }}
                        onSubmit={values => {
                            addNote(values.title, values.description, values.tag)
                            props.setIsAddModalOpen(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="p-4">
                                <div className="grid gap-4 mt-4 grid-cols-2">
                                    <div className='col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="title">Title</label>
                                        <Field className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type Note Title" name="title" validate={validateTitle} />
                                        {errors.title && touched.title && <p className='float-right text-xs text-red-600'>{errors.title}</p>}
                                    </div>
                                    <div className="col-span-2 mt-4 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                                        <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' as="select" name="tag" validate={validateTag}>
                                            <option value="">Select a tag</option>
                                            {Object.keys(currentTags).map((key) => {
                                                return <option key={key} value={key}>{key}</option>
                                            })}
                                        </Field>
                                        {errors.tag && touched.tag && <p className='float-right text-xs text-red-600'>{errors.tag}</p>}
                                    </div>
                                    <div className='col-span-2 mt-4'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="Description">Note Description</label>
                                        <Field as='textarea' className=" bg-gray-50 h-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type Note Description" name="description" validate={validateDescription} />
                                        {errors.description && touched.description && <p className='float-right text-xs text-red-600'>{errors.description}</p>}
                                    </div>
                                </div>
                                <button type="submit" className="text-white mt-4 inline-flex items-center bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:border-primary_light font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add new note
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddModal