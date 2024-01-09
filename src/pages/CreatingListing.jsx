import React from 'react'

export default function CreatingListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 '>CreatingListing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
         <div className="flex flex-col gap-3 flex-1">
            <input type="text" 
             placeholder='name' 
             className='border p-3
             rounded-lg' 
             id="name" 
             maxLength="62"
             required 
            />
            <textarea type="text" 
             placeholder='Description' 
             className='border p-3
             rounded-lg' 
             id="Description" 
             required 
            />
            <input type="text" 
             placeholder='address' 
             className='border p-3
             rounded-lg' 
             id="address" 
             required 
            />

            <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input type="checkbox" id="sale" />
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="rent" />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="parking" />
                    <span>Parking sport</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="furnished" />
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="offer" />
                    <span>Offer</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                <input className='p-2 border-gray-300 '
                    type='number' 
                    id="bedrooms" min="1" 
                    max='12' 
                    required/>
                    <p>Beds</p>
                </div>

                <div className="flex items-center gap-5">
                    <input className='p-2 border-gray-300 '
                    type='number' 
                    id="baths" min="1" 
                    max='12' 
                    required/>
                    <p>Baths</p>
                </div>

                <div className="flex items-center gap-2">
                <input className='p-2 border-gray-300 '
                    type='number' 
                    id="Regularprice" min="1" 
                    max='1' 
                    required/>
                    <div className='flex flex-col items-center'>
                    <p>Regular price</p>
                    <span className='text-xs'>($ /Months)</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                <input className='p-2 border-gray-300 rounded'
                    type='number' 
                    id="discountprice" min="1" 
                    max='12' 
                    required/>
                    <div className='flex flex-col items-center'>
                    <p>Descounted price</p>
                    <span className='text-xs'>($ /Months)</span>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-500'>The first image will be the cover(max 6)</span>
                    </p>
                    <div className="n">
                        <input 
                        className='p-3 '
                        type="file" 
                        id='images' 
                        accept='image/*' 
                        multiple 
                        />
                        <button className='p-2 text-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                </div>
                <button className='p-3 h-11 bg-slate-600  text-white rounded-lg uppercase hover:opacity-95'>Create listing</button>
            </div>           
         </div>
            
        </form>
    </main>
  )
}
