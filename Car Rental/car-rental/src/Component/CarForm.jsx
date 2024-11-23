import { useState } from 'react'

const postUrl = "http://localhost:8000/cars/add_car"

const CarForm = () => {
    const [res, setRes] = useState({ state: null, statusCode: null, message: null, isRes: false })


    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        color: '',
        mileage: '',
        price: '',
        description: '',
        // image: null, // If you want to handle image uploads
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would send formData to your Django backend API
        console.log(formData); // For now, just log the data


        fetch(postUrl, {
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then(response => {

                if (!response.ok) {
                    return response.json().then(json => {

                        if (json) {

                            if (json.state === "failed") {
                                let message = "Your request has failed, please check your data\nError:" + json.message.error
                                setRes({ status: response.status, message, state: "failed", isRes: true })
                                throw new Error(message);
                            }
                            else if (json.state === "rejected") {
                                let message = "Your request has been rejected, please check your request method type.\nError:" + json.message.error
                                setRes({ status: response.status, message, state: "rejected", isRes: true })
                                throw new Error(message)
                            }
                            else {
                                let message = "There was an error with your request\nError:" + json.message.error
                                setRes({ status: response.status, message, state: "Unknown", isRes: true })
                                throw new Error(message);
                            }

                        }
                    })
                        .catch(error => {
                            console.error(error);
                        })

                    // setRes({ status: response.status, message: response.statusText, state: "Unknown", isRes: true })
                    // throw new Error(`status: ${response.status}, message:${response.statusText}`);
                }


                return response.json();
            })
            .then(json => {
                console.log(json)
                if (json.state === "success") {
                    setRes({ status: json.status, message: json.message.success, state: "success", isRes: true })
                }
                return json
            })
            .catch(
                error => {
                    console.error(error);
                }
            )
    };


    const handleAlertClose = () => {
        setRes({ status: null, message: null, state: null, isRes: false })
    }

    return (


        <>

            {res.isRes &&
                <div className='container alert alert-danger alert-dismissible fade show' role='alert'>
                    <p className='m-0'> {res.message}</p>
                    <button type='button' className='btn-close' data-bs-dismiss="alert" onClick={handleAlertClose}></button>
                </div>

            }


            <div className="container mt-5 border border-2 rounded rounded-3 shadow p-3">
                <h2 className="mb-4 text-center">Add a New Car</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="brand" className="form-label">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="model" className="form-label">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="year" className="form-label">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="color" className="form-label">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label htmlFor="mileage" className="form-label">
                                    Mileage
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="mileage"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <input type="submit" value="Submit" className='btn btn-success' />
                </form>
            </div>
        </>

    )
}

export default CarForm

