import React, { useState } from 'react'

export default function Input({ onCreate }) {
    const [value, setValue] = useState()

    function sumbitHandler(event) {
        event.preventDefault()
            onCreate(value)
            setValue('')
    }

    return (
        <form onSubmit={sumbitHandler}>
            <div className="from-group products">
                <input type="text"
                    name="name"
                    className="form-control"
                    htmlFor="name"
                    placeholder="Введите название продукта"
                    value={value} onChange={event => setValue(event.target.value)}
                />&nbsp;
                <input type="submit" className="btn btn-outline-primary" value="Добавить"></input>
            </div>
        </form>
    )
}