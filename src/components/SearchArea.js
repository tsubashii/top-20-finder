import React from 'react';

const SearchArea = (props) => {
    return (
        <div className="">
            <div className="row">
                <section className=" col s4 offest-4">
                    <form action="" onSubmit={props.handleSubmit}>
                        <div className="input-field">
                            <input className="::placeholder" placeholder="Search People..." type="text" style={{ color: "#4d4d4d" }} onChange={props.handleChange} />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SearchArea;