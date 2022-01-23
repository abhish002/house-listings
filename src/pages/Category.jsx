import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';

import { db } from '../firebase.config';

import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings');

        // create query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // execute query
        const snapshot = await getDocs(q);

        const listings = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            data: doc.data(),
          }
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchListings();
  }, [params.categoryName]);

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='category'>
      <header>
        <p className="pageHeader">
          {
            params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'
          }
        </p>
      </header>
      {
        listings.length === 0 ?
          <p>No Listings for {params.categoryName}</p> :
          (
            <main>
              <ul className='categoryListings'>
                {
                  listings.map((listing) => <h3 key={listing.id}>{listing.data.name}</h3>)
                }
              </ul>
            </main>
          )
      }
    </div>
  )
}

export default Category;
