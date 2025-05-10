import React from 'react'

const Addsevices = () => {
    return (
        <>
            <div className="container mt-4">
                <div className="card shadow-lg">
                    <div className="card-header ">
                        <h4>Add Note</h4>
                    </div>
                    <div className="card-body">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title"  required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="description"  name="description" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="tag"  name="tag"  />
                            </div>
                            <button type="submit" className="btn btn-primary">AddServices</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addsevices