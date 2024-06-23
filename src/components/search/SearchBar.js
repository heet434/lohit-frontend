// import React from 'react'
// import './SearchBar.css'


// function SearchBar(props) {
//   return (
//     <div id='searchBar'>
//         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
//             <path d="M8.57633 7.54717H8.03431L7.8422 7.36192C8.51458 6.57976 8.91938 5.56432 8.91938 4.45969C8.91938 1.99657 6.92281 0 4.45969 0C1.99657 0 0 1.99657 0 4.45969C0 6.92281 1.99657 8.91938 4.45969 8.91938C5.56432 8.91938 6.57976 8.51458 7.36192 7.8422L7.54717 8.03431V8.57633L10.9777 12L12 10.9777L8.57633 7.54717ZM4.45969 7.54717C2.75129 7.54717 1.37221 6.1681 1.37221 4.45969C1.37221 2.75129 2.75129 1.37221 4.45969 1.37221C6.1681 1.37221 7.54717 2.75129 7.54717 4.45969C7.54717 6.1681 6.1681 7.54717 4.45969 7.54717Z" fill="#2B252E"/>
//         </svg>
//         Search
//     </div>
//   )
// }

// export default SearchBar

import React from 'react'
import './SearchBar.css'
// use react-select for search bar, to search across all menu items
import Select from 'react-select'

function SearchBar(props) {


  const searchOptions = props.menuItems.map((item) => {
    return {value: item.item, label: item.item}
  })

  return (
    <div id='searchBar'>
      {/* <div className='search-title'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8.57633 7.54717H8.03431L7.8422 7.36192C8.51458 6.57976 8.91938 5.56432 8.91938 4.45969C8.91938 1.99657 6.92281 0 4.45969 0C1.99657 0 0 1.99657 0 4.45969C0 6.92281 1.99657 8.91938 4.45969 8.91938C5.56432 8.91938 6.57976 8.51458 7.36192 7.8422L7.54717 8.03431V8.57633L10.9777 12L12 10.9777L8.57633 7.54717ZM4.45969 7.54717C2.75129 7.54717 1.37221 6.1681 1.37221 4.45969C1.37221 2.75129 2.75129 1.37221 4.45969 1.37221C6.1681 1.37221 7.54717 2.75129 7.54717 4.45969C7.54717 6.1681 6.1681 7.54717 4.45969 7.54717Z" fill="#2B252E"/>
        </svg>
        Search
      </div> */}
      <Select
        options={searchOptions}
        placeholder='Search'
        isSearchable
        // isClearable
        styles={{
          control: (styles, state) => ({
            ...styles,
            backgroundColor: '#F3F3E7',
            borderRadius: '0px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '30px',
            padding: '0px',
            border: 'none',
            boxShadow: 'none',        
          }),
        }}
        className='basic-single'
        classNamePrefix='select'
        // defaultValue={'search'}
        onChange={props.handleSearch}
        value={props.searchValue}
        label='Search'
      />
    </div>
  )
}

export default SearchBar