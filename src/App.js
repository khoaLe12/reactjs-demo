import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo, useReducer, useContext, useImperativeHandle } from 'react'
import './App.css'
import Content from './Content'
import { MemoContentExport1 as MemoContent1, MemoContentExport2 as MemoContent2 } from './MemoContent'
import Bai21 from './Todo'
import { ThemeContext, ThemeProvider } from './ThemeContext.js'
import { useStore, actions } from './store'
import Video from './video.js'



function Bai1() {
  const orders = [100, 200, 300]

  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur)
    return total;
  })
  const handleIncrease = () => {
    setCounter(counter + 1)
  }

  const [info, setInfo] = useState({
    name: 'Nguyen Van A',
    age: 18,
    address: 'Ha Noi, VN'
  });
  const handleUpdate = () => {
    setInfo(prev => {

      //Logic 

      return {
        ...prev,
        bio: 'Sở thích'
      }
    })
  }

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>

      <h1>{JSON.stringify(info)}</h1>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}





function Bai2() {
  const gifts = [
    'CPU i9',
    'RAM 32GB RGB',
    'RGB Keyboard',
  ]

  const [gift, setGift] = useState()

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setGift(gifts[index])
  }

  return (
    <div>
      <h1>{gift || 'Chưa có phần thưởng'}</h1>
      <button onClick={randomGift}>Lấy thưởng</button>
    </div>
  )
}





function Bai3() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    console.log({
      name,
      email
    });
  }

  return (
    <div>
      <h3>Thông tin đăng ký: </h3>
      <p>{name || 'null'} - {email || 'null'}</p>

      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />

      <button onClick={handleSubmit}>Register</button>
    </div>
  )
}





function Bai4() {
  const courses = [
    {
      id: 1,
      name: 'HTLM, CSS'
    },
    {
      id: 2,
      name: 'Javascript'
    },
    {
      id: 3,
      name: 'ReactJS'
    }
  ];

  const [checked, setChecked] = useState(2);

  const handleChoose = () => {
    console.log({ id: checked });
  }

  return (
    <div>
      <h3>Choosed course: {checked || ''}</h3>
      {courses.map(course => (
        <div key={course.id}>
          <input
            type="radio"
            onChange={() => setChecked(course.id)}
            checked={checked == course.id}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleChoose}>Choose</button>
    </div>
  )
}






function Bai5() {
  const courses = [
    {
      id: 1,
      name: 'HTLM, CSS'
    },
    {
      id: 2,
      name: 'Javascript'
    },
    {
      id: 3,
      name: 'ReactJS'
    }
  ];

  const [checked, setChecked] = useState([]);

  const handleChoose = () => {
    console.log(checked);
  }

  const handleCheck = (id) => {
    setChecked(prev => {
      const isChecked = prev.includes(id)
      if (isChecked) {
        return prev.filter(item => item != id)
      }
      else {
        return [...prev, id]
      }
    })
  }

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <input
            type="checkbox"
            onChange={() => handleCheck(course.id)}
            checked={checked.includes(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleChoose}>Choose</button>
    </div>
  )
}





function Bai6() {

  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'));

    return storageJobs ?? [];
  });

  console.log(job);

  const handleAdd = () => {
    setJobs(prev => {
      const newJobs = [...prev, job]

      //Save to local storage
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem('jobs', jsonJobs)

      return newJobs;
    })
    setJob('');
  }

  return (
    <div>
      <input value={job} onChange={e => setJob(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  )
}





function Bai7() {

  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Content />}
    </div>
  )
}






// Dùng useEffect để update DOM
// useEffect có 3 trường hợp: 
// 1. useEffect(callBack) - ít xài
// - gọi callback mỗi khi component re-render
// - gọi callback mỗi khi component thêm element vào DOM
// 2. useEffect(callBack, []) - thường xài
// - chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callBack, [deps]) - thường xài
// - gọi callback mỗi khi deps thay đổi (nó sẽ kiểm tra deps trc và sau khi render/re-render)

// I. Chung cho 3 trường hơp: Callback luôn được gọi sau khi component mounted
// II. Cleanup function luôn được gọi trước khi component unmouted
// III. Cleanup function luôn đc gọi trc khi callback function đc gọi (trừ lần mounted đầu tiên)

function Bai8_Content() {
  const [title, setTitle] = useState('')

  useEffect(() => {

    document.title = title;
  })

  return (
    <div>
      <h1>Hello everybody</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
    </div>
  )
}
function Bai8() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai8_Content />}
    </div>
  )
}






function Bai9_Content() {
  const [posts, setPosts] = useState([])

  // Chỉ gọi 1 lần duy nhất sau khi component mounted 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => {
        setPosts(posts)
      })
  }, [])

  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
function Bai9() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai9_Content />}
    </div>
  )
}




const tabs = ['posts', 'comments', 'albums']
function Bai10_Content() {
  const [type, setType] = useState('posts');
  const [result, setResult] = useState([]);
  // const [showGoToTop, setShowGoToTop] = useState(false)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(res => res.json())
      .then(result => {
        setResult(result)
      })
  }, [type])

  // useEffect(() => {
  //   const handleScrool = () => {
  //     if (window.scrollY >= 1000) {
  //       setShowGoToTop(true);
  //     }
  //     else {
  //       setShowGoToTop(false);
  //     }
  //   }
  //   window.addEventListener('scroll', handleScrool);
  //   console.log('addEventListener')

  //   // Cleanup function runs before the component is removed from the DOM or before the effect is retriggered (before component is re-render).
  //   return () => {
  //     window.removeEventListener('scroll', handleScrool)
  //     console.log('removeEventListener')
  //   };
  // }, [])

  return (
    <div>
      {tabs.map(tab => (
        <button key={tab}
          style={type === tab ? {
            color: '#fff',
            backgroundColor: '#333'
          } : {}}
          onClick={() => setType(tab)}>
          {tab}
        </button>
      ))}
      <ul>
        {result.map(item => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
      {/* {showGoToTop && (
        <button style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          width: '90px',
          height: '30px'
        }}>
          Go to top
        </button>
      )} */}
    </div>
  )
}
function Bai10() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai10_Content />}
    </div>
  )
}



function Bai11_Content() {
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1000) {
        setShowGoToTop(true);
      }
      else {
        setShowGoToTop(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    console.log('addEventListener(scroll)')

    const handleResize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    console.log('addEventListener(resize)')

    // Cleanup function runs before the component is removed from the DOM or before the effect is retriggered (before component is re-render).
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('removeEventListener(scroll)')

      window.removeEventListener('resize', handleResize);
      console.log('removeEventListener(resize)')
    }
  }, [])
  return (
    <div>
      <h2>Resize with width: {width}</h2>
      {showGoToTop && (
        <button style={{ position: 'fixed', right: '20px', bottom: '20px', width: '90px', height: '30px' }}>
          Go to top
        </button>
      )}
    </div>
  )
}
function Bai11() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai11_Content />}
    </div>
  )
}



function Bai12_Content() {
  const [countDown, setCountDown] = useState(180)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown(prev => prev - 1)
      console.log('Countdown...')
    }, 1000)

    return () => clearInterval(timerId);
  }, [])

  // Cách 2
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCountDown(countDown - 1)
  //   }, 1000)
  // }, [countDown])

  return (
    <div>
      <h1>{countDown}</h1>
    </div>
  )
}
function Bai12() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai12_Content />}
    </div>
  )
}




function Bai13_Content() {

  const [avatar, setAvatar] = useState();

  useEffect(() => {

    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  }
  return (
    <div>
      <input type='file' onChange={handlePreviewAvatar} />
      {avatar && (
        <img src={avatar.preview} alt='' width='80%' />
      )}
    </div>
  )
}
function Bai13() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai13_Content />}
    </div>
  )
}




const lessons = [
  {
    id: 1,
    name: 'ReactJs'
  },
  {
    id: 2,
    name: 'SPA/MPA'
  },
  {
    id: 3,
    name: 'Arrow function'
  }
]
function Bai14_Content() {
  const [lessonId, setLessonId] = useState(1)

  useEffect(() => {
    const handleComment = ({ detail }) => {
      console.log(detail);
    }
    window.addEventListener(`lesson-${lessonId}`, handleComment)

    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment)
    }
  }, [lessonId])

  return (
    <div>
      <ul>
        {lessons.map(lesson => (
          <li
            key={lesson.id}
            style={{
              color: lessonId === lesson.id ? 'red' : '#333'
            }}
            onClick={() => setLessonId(lesson.id)}>
            {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
function Bai14() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai14_Content />}
    </div>
  )
}




// useEffect
// 1. Cập nhật lại state
// 2. Cập nhật DOM (mutated)
// 3. Render lại UI
// 4. Gọi Cleanup function nếu deps thay đổi
// 5. Gọi useEffect callback

// useLayoutEffect
// 1. Cập nhật lại state
// 2. Cập nhật lại DOM (mutated)
// 3. Gọi Cleanup nếu deps thay đổi (sync)
// 4. Gọi useLayoutEffect callback (sync)
// 5. Render lại UI



function Bai15_Content() {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    if (count > 3)
      setCount(0)
  }, [count])

  const handleRun = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleRun}>Run</button>
    </div>
  )
}
function Bai15() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai15_Content />}
    </div>
  )
}




// useRef nhận giá trị khởi tạo ngay lần đầu tiên componennt đc mount (ko chạy lại khi component đc re-render)
function Bai16_Content() {

  const [count, setCount] = useState(60);

  const timerId = useRef()
  const prevCount = useRef()
  const h1Ref = useRef()

  useEffect(() => {
    prevCount.current = count
  }, [count])

  useEffect(() => {
    const rect = h1Ref.current.getBoundingClientRect()
    console.log(rect)
  }, [])

  const handleStart = () => {
    timerId.current = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)
  }

  const handleStop = () => {
    clearInterval(timerId.current);
  }

  //console.log(count, prevCount.current)

  return (
    <div>
      <h1 ref={h1Ref}>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  )
}
function Bai16() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai16_Content />}
    </div>
  )
}




// 1. React.memo() -> Higher Order COmponent (HOC)
// 2. useCallback()
// memo() -> giúp ghi nhớ lại các props của 1 component, để quyết định có nên re-render lại component đó hay ko (tránh việc re-render ko cần thiết)
// Nó ghi nhớ lại các props của 1 component, check các props có bị thay đổi hay ko, nếu có thì re-render lại, nếu ko thì giữ nguyên

// 3 khái niệm thường hay sử dụng trong react (hỗ trợ việc kế thừa, tái sử dụng logic):
// Hooks (dùng trong thân của function component)
// HOC (đc dùng với cả class và function component - wrap component lại)
// Render props
function Bai17_Content() {

  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <MemoContent1 />
      <h1>{count}</h1>
      <button onClick={increase}>Click me!</button>
    </div>
  )
}
function Bai17() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai17_Content />}
    </div>
  )
}




function Bai18_Content() {
  const [count, setCount] = useState(0)

  const handleIncrease = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <div>
      <MemoContent2 onIncrease={handleIncrease} />
      <h1>{count}</h1>
    </div>
  )
}
function Bai18() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <Bai18_Content />}
    </div>
  )
}




// useMemo giúp tránh thực hiện lại 1 logic ko cần thiết
// useMemo nhận 2 tham số gồm callback function và array of deps, trả về result của callback, hoạt động tương tự useEffect
function Bai19_Content() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [products, setProducts] = useState([])

  const nameRef = useRef();

  const handleSubmit = () => {
    setProducts([...products, {
      name, price: +price // dấu + giúp đổi từ chuối sang số
    }])
    setName('')
    setPrice('')

    nameRef.current.focus();
  }

  const total = useMemo(() => {
    const result = products.reduce((result, prod) => {
      console.log('Tính toán')
      return result + prod.price
    }, 0)

    return result
  }, [products])

  return (
    <>
      <input ref={nameRef} value={name} placeholder='Enter name...' onChange={e => setName(e.target.value)} />
      <br />
      <input value={price} placeholder='Enter price...' onChange={e => setPrice(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Add</button>
      <br />
      Total: {total}
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </>
  )
}
function Bai19() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
      <br />
      {show && <Bai19_Content />}
    </div>
  )
}




// useReducer
// 1.Init state: 0
// 2. Actions: Up (state + 1) / Down (state - 1)
// 3. Reducer
// 4. Dispatch
function Bai20_Content() {

  // Init state
  const initState = 0;
  // Actions
  const UP_ACTION = 'up'
  const DOWN_ACTION = 'down'
  // Reducer
  const reducer = (state, action) => {
    switch (action) {
      case UP_ACTION:
        return state + 1
      case DOWN_ACTION:
        return state - 1
      default:
        throw new Error('Invalid action')
    }
  }
  const [count, dispatch] = useReducer(reducer, initState)

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
      <button onClick={() => dispatch(UP_ACTION)}>Up</button>
    </>
  )
}
function Bai20() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
      <br />
      {show && <Bai20_Content />}
    </div>
  )
}




// Context
// 1. Create context
// 2. Provider
// 3. Consumer
// Thay vì truyền props từ CompA => CompB => CompC
// Thì có thể truyền context từ CompA => CompC
function Paragraph() {
  const context = useContext(ThemeContext)
  return (
    <p className={context.theme + ' border'}>
      The headphones were on. They had been utilized on purpose. She could hear her mom yelling in the background, but couldn't make out exactly what the yelling was about. That was exactly why she had put them on. She knew her mom would enter her room at any minute, and she could pretend that she hadn't heard any of the previous yelling.
    </p>
  )
}
function Bai22_Child_Content() {
  return (
    <>
      <Paragraph />
    </>
  )
}
function Bai22_Content() {
  const context = useContext(ThemeContext)
  return (
    <div>
      <button onClick={context.toggleTheme}>Toggle theme</button>
      <Bai22_Child_Content />
    </div>
  )
}
function Bai22() {
  const [show, setShow] = useState(false);
  return (
    <ThemeProvider>
      <div>
        <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
        <br />
        {show && <Bai22_Content />}
      </div>
    </ThemeProvider>
  )
}




function Bai23_Content() {

  const [state, dispatch] = useStore();
  const { todos, todoInput } = state

  const inputRef = useRef();

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput))
    dispatch(actions.setTodoInput(''))
    inputRef.current.focus()
  }

  return (
    <div>
      <input 
        ref={inputRef}
        value={todoInput} 
        placeholder='Enter todo...'
        onChange={e => {
          dispatch(actions.setTodoInput(e.target.value))
        }}/>
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}
function Bai23() {
  const [show, setShow] = useState(false);
  return (
    <ThemeProvider>
      <div>
        <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
        <br />
        {show && <Bai23_Content />}
      </div>
    </ThemeProvider>
  )
}




function Bai24_Content() {
  const videoRef = useRef();

  const handlePlay = () => {
    videoRef.current.play()
  }

  const handlePause = () => {
    videoRef.current.pause()
  }

  return (
    <>
      <h2>Video</h2>
      <Video ref={videoRef}/>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </>
  )
}
function Bai24() {
  const [show, setShow] = useState(false);
  return (
    <ThemeProvider>
      <div>
        <button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>Toggle</button>
        <br />
        {show && <Bai24_Content />}
      </div>
    </ThemeProvider>
  )
}





function App() {
  return (
    <div style={{ padding: 32 }}>
      <div className='border'>
        <h1>Exercise 1</h1>
        <Bai1 />
      </div>

      <div className='border'>
        <h1>Exercise 2</h1>
        <Bai2 />
      </div>

      <div className='border'>
        <h1>Exercise 3: 2 ways binding</h1>
        <Bai3 />
      </div>

      <div className='border'>
        <h1>Exercise 4</h1>
        <Bai4 />
      </div>

      <div className='border'>
        <h1>Exercise 5</h1>
        <Bai5 />
      </div>

      <div className='border'>
        <h1>Exercise 6</h1>
        <Bai6 />
      </div>

      <div className='border'>
        <h1>Exercise 7: Mounted and Unmouted</h1>
        <Bai7 />
      </div>

      <div className='border'>
        <h1>Exercise 8: useEffect(callBack)</h1>
        <h3>Callback đc gọi sau khi component mounted và sau khi component đc re-render</h3>
        <Bai8 />
      </div>

      <div className='border'>
        <h1>Exercise 9: useEffect(callBack, [])</h1>
        <h3>Callback chỉ gọi 1 lần duy nhất sau khi component mounted</h3>
        <Bai9 />
      </div>

      <div className='border'>
        <h1>Excercise 10: useEffect(callBack, [deps])</h1>
        <h3>Callback đc gọi sau khi component mounted và sau khi deps thay đổi (deps có thể là props, state)</h3>
        <Bai10 />
      </div>

      <div className='border'>
        <h1>Exercise 11: Listen DOM events with useEffect</h1>
        <h3>Cleanup function run before component unmouted or re-render</h3>
        <h3>If the component re-render, Cleanup function run before callback function</h3>
        <li>Sroll event (khi kéo xuống 1000px, show nút 'go to top') - useEffect(callBack, []) </li>
        <li>Resize page event (mở rộng trang trình duyệt theo chiều ngang)</li>
        <Bai11 />
      </div>

      <div className='border'>
        <h1>Excercise 12: useEffect with timer function</h1>
        <h3>Should use callback function for state of countdown (state here is function setCountDown which change the value of countDown)</h3>
        <Bai12 />
      </div>

      <div className='border'>
        <h1>Excercise 13: useEffect with preview avatar - Upload file</h1>
        <h3>Nên xóa ảnh cũ khỏi bỏ nhớ tạm thời của trình duyệt</h3>
        <Bai13 />
      </div>

      <div className='border'>
        <h1>Excercise 14: useEffect with fake chat app</h1>
        <Bai14 />
      </div>

      <div className='border'>
        <h1>Excercise 15: useLayoutEffect</h1>
        <Bai15 />
      </div>

      <div className='border'>
        <h1>Excercise 16: useRef</h1>
        <h3>useRef có thể đc dùng để tham chiếu đến DOM element đã đc render (có thể lấy ra trong callback của useEffect)</h3>
        <Bai16 />
      </div>

      <div className='border'>
        <h1>Excercise 17: React.memo() HOC</h1>
        <h4>
          <li>Excercise 17 đang sử dụng component 'Hello ae' (đây là 1 component cố định, ko bị thay đổi nội dung)</li>
          <br />
          <li>Mỗi lần bấm nút 'click me!' sẽ re-render lại component 'Excercise 17', điều này sẽ đồng thời re-render lại component 'Hello ae' (việc này là ko cần thiết)</li>
          <br />
          <li>Nên sử dụng memo() để tránh việc re-render lại 'Hello ae'</li>
        </h4>
        <Bai17 />
      </div>

      <div className='border'>
        <h1>Excercise 18: useCallback</h1>
        <h3>
          <li>Dùng chung vs memo(), giúp tránh re-render những function ko cần thiết (useCallback kiểm soát việc trả về các kiểu tham chiếu)</li>
          <li>useCallBack() nhận vào 2 tham số gồm 'định nghĩa function' và 'array các deps'. Nó trả về 'tham chiếu' đến function</li>
          <li>useCallback() hoạt động tương tự như useEffect (chỉ gọi 1 lần sau khi component mounted hoặc deps thay đổi)</li>
          <li>Cho nên nếu useCallback() đc gọi thì nó sẽ trả về tham chiếu mới</li>
        </h3>
        <Bai18 />
      </div>

      <div className='border'>
        <h1>Excercise 19: useMemo</h1>
        <h3>useMemo giúp tránh việc thực hiện lặp lại logic 1 cách ko cần thiết</h3>
        <Bai19 />
      </div>

      <div className='border'>
        <h1>Exercise 20: useReducer</h1>
        <h3>useReducer cung cấp thêm 1 lựa chọn tạo ra state (trạng thái) cho function component</h3>
        <li>useState phù hợp hơn khi sử dụng vs các kiểu dữ liệu nguyên thủy (state đơn giản)</li>
        <li>useReducer phù hợp hơn trong những tình huống có state phức tạp (những kiểu dữ liệu phức tạp như array, object, ...) (hoặc có nhiều state)</li>
        <Bai20 />
      </div>

      <div className='border'>
        <h1>Exercise 21: useReducer example</h1>
        <Bai21 />
      </div>

      <div className='border'>
        <h1>Excercise 22: React context & useContext() hook</h1>
        <h3>Context là một khái niệm giúp việc truyền dữ liệu từ component cha xuống component con mà ko cần phải sử dụng props</h3>
        <Bai22 />
      </div>

      <div className='border'>
        <h1>Excercise 23: Global state with Context + useReducer</h1>
        <Bai23 />
      </div>

      <div className='border'>
        <h1>Exercise 24: useImperativeHandle() hook</h1>
        <Bai24 />
      </div>
    </div>
  );
}

export default App;