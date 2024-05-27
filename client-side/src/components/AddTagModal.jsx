import React from 'react'
import { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import UserContext from '../context/notes/userContext';

function AddTagModal(props) {
    const userContext = useContext(UserContext);
    const { currentTags, createTag } = userContext;
    const [colorPicked, setColorPicked] = useState('#ff4f5b');

    const validateName = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (value.length < 2) {
            error = 'Name too short';
        } else if (value.length > 50) {
            error = 'Name too long';
        } else if (Object.keys(currentTags).includes(value)) {
            error = 'Name already exists'
        }
        return error;
    }

    return (
        <div tabIndex="-1" aria-hidden="true" hidden={!(props.isAddTagOpen)} className="w-full fixed z-50 top-5" >
            <div className="relative mx-auto w-full max-w-md max-h-full" >
                <div className="relative bg-white rounded-lg shadow border-2 border-gray-300">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-primary">
                            Create New Tag
                        </h3>
                        <button onClick={() => { props.setIsAddTagOpen(false); }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span onClick={() => { props.setIsAddModalOpen(false); }} className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <Formik
                        initialValues={{
                            tagName: '',
                            color: colorPicked,
                        }}
                        onSubmit={values => {
                            const tag = {}
                            tag[values.tagName] = colorPicked
                            console.log(tag);
                            createTag(tag)
                            props.setIsAddTagOpen(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="p-4">
                                <div className="grid gap-4 mt-4 grid-cols-2">
                                    <div className='col-span-2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="tagName">Tag Name</label>
                                        <Field className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type Tag Name" name="tagName" validate={validateName} />
                                        {errors.tagName && touched.tagName && <p className='float-right text-xs text-red-600'>{errors.tagName}</p>}
                                    </div>
                                    <div className='col-span-2 my-4'>
                                        <label className=" mb-2 text-sm font-medium text-gray-900 " htmlFor="Description">Select accent color</label>
                                        <input value={colorPicked} onChange={(e) => { setColorPicked(e.target.value) }} type='color' className='border border-gray-300 rounded-md ml-3' name="color" />
                                    </div>
                                </div>
                                <button type="submit" className="text-white mt-4 inline-flex items-center bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:border-primary_light font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add new Tag
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddTagModal