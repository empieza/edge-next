import Table, {
  TableCellBody,
  TableCellHeader,
  TableRowBody,
} from '../components/generic/table/table'

import Avatar from '../components/user/avatar/avatar'
import Badge from '../components/generic/badge/badge'
import Button from '../components/generic/button/button'
import ContentSummaryView from '../components/content/read-content/content-summary-view/content-summary-view'
import DropdownMenu from '../components/generic/dropdown-menu/dropdown-menu'
import DynamicField from '../components/generic/dynamic-field/dynamic-field'
import Image from '../components/generic/image/image'
import Layout from '../components/layout/normal/layout'
import Link from 'next/link'
import LinkList from '../components/generic/link-list/link-list'
import Map from '../components/generic/map/map'
import Select from '../components/generic/select/select'
import SocialShare from '../components/generic/social-share/social-share'
import TagsInput from '../components/generic/tags-input/tags-input'
import ThemeSelector from '../components/generic/theme-selector/theme-selector'
import Toggle from '../components/generic/toggle/toggle'
import VideoRecorder from '../components/generic/video-recorder/video-recorder-wrapper'
import Upload from '../components/generic/upload/upload'

const Components = () => {
  const demoContent = {
    title: 'This is an example content',
    textarea:
      'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet,  Lorem ipsum dolor sit amet, ',
    slug: 'the-slug',
    type: 'demo-content-type',
  }

  const demoContentWithImage = {
    title: 'This is an example content',
    img: '/static/demo-images/default-background.jpg',
    slug: 'the-slug',
    type: 'demo-content-type',
  }

  const demoContentType = {
    slug: 'demo-content-type',
    publishing: {
      title: 'title'
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        title: true,
        label: 'title',
      },
      {
        type: 'img',
        name: 'img',
        label: 'img',
      },
      {
        type: 'textarea',
        name: 'textarea',
        label: 'textarea',
      },
    ],
  }

  const dynamicFields = [
    {
      type: 'img',
      name: 'img',
      label: 'Image field',
    },
    {
      type: 'text',
      required: true,
      min : 10,
      max: 100,
      name: 'text',
      label: 'Text field',
      placeholder: 'A placeholder'
    },
    {
      type: 'textarea',
      name: 'textarea',
      label: 'Textarea',
      placeholder: 'A placeholder'
    },
    {
      type: 'select',
      name: 'select-dynamic',
      label: 'A select',
      options: [{
        value: 'option',
        label: 'an option'
      }, {
        value: 'option2',
        label: 'another option'
      }, {
        value: 'option3',
        label: 'the last option'
      }]
    },
    {
      type: 'radio',
      name: 'radio-dynamic',
      label: 'A radio',
      options: [{
        value: 'option',
        label: 'an option'
      }, {
        value: 'option2',
        label: 'another option'
      }, {
        value: 'option3',
        label: 'the last option'
      },  {
        value: 'option4',
        label: 'the last option?'
      },  {
        value: 'option5',
        label: 'maybe not'
      },  {
        value: 'option6',
        label: 'not the last option'
      },  {
        value: 'option7',
        label: 'almost the last option'
      }, {
        value: 'option8',
        label: 'yes! the last option'
      }]
    },
    {
      type: 'json',
      name: 'json',
      label: 'Json field',
      placeholder: 'A placeholder'
    },
    {
      type: 'toggle',
      name: 'toggle',
      label: 'Toggle field',
    },
  ]

  return (
    <Layout title="Components showcase" fullWidth={true}>
      <div className="components-layout">
        <div className="list-menu">
          <ul>
            <li>
              <a href="#drop-menu">Dropdown menu</a>
            </li>
            <li>
              <a href="#linklist">Link list</a>
            </li>
            <li>
              <a href="#avatar">Avatar</a>
            </li>
            <li>
              <a href="#badge">Badge</a>
            </li>
            <li>
              <a href="#button">Button</a>
            </li>
            <li>
              <a href="#toggle">Toggle</a>
            </li>
            <li>
              <a href="#socialshare">Social Share</a>
            </li>
            <li>
              <a href="#themeselector">Theme selector</a>
            </li>
            
            <li>
              <a href="#contentsummaryview">Content Summary View</a>
            </li>
            <li>
              <a href="#image">Image</a>
            </li>
            <li className="submenu">
              <a href="#form-elements">Form elements</a>
              <ul>
                <li>
                  <a href="#select">Select</a>
                </li>
                <li>
                  <a href="#input-radio">Input Radio</a>
                </li>
                <li>
                  <a href="#input-text">Input Text</a>
                </li>
                <li>
                  <a href="#textarea">Textarea</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#form-elements-dynamic">Form Elements Dynamic</a>
            </li>
            <li>
              <a href="#tagsinput">Tags Input</a>
            </li>
            <li>
              <a href="#table">Table</a>
            </li>
            <li>
              <a href="#videorecorder">Video Recorder</a>
            </li>
            <li>
              <a href="#upload">Upload</a>
            </li>
            <li>
              <a href="#map">Map</a>
            </li>
          </ul>
        </div>
        <div className="components">
          <h1>Components showcase</h1>

          <div id="drop-menu" className="component">
            <h3>Dropdown menu</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <DropdownMenu align={'left'}>
                  <ul>
                    <li>
                      <Link href="/">
                        <a title="Home">Home</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile">
                        <a title="Home">Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/components">
                        <a title="Components">Components</a>
                      </Link>
                    </li>
                  </ul>
                  <span className="spacer"></span>
                  <h4>Content</h4>
                  <ul>
                    <li>
                      <Link href="/create/post">
                        <a title="New Post">New Post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/content/post">
                        <a title="Read posts">Read posts</a>
                      </Link>
                    </li>
                  </ul>
                </DropdownMenu>
              </div>
            </div>
            <pre>{`
<DropdownMenu>
  <ul>
    <li><Link href="/" ><a title="Home">Home</a></Link></li>
    <li><Link href="/profile" ><a title="Home">Profile</a></Link></li>
    <li><Link href="/components" ><a title="Components">Components</a></Link></li>
  </ul>
  <span className="spacer"></span>
  <h4>Content</h4>
  <ul>
    <li><Link href="/create/post" ><a title="New Post">New Post</a></Link></li>
    <li><Link href="/content/post" ><a title="Read posts">Read posts</a></Link></li>
  </ul>
</DropdownMenu>
            `}</pre>
          </div>

          <div id="linklist" className="component">
            <h3>Link list</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <LinkList
                  links={[
                    { title: 'test', link: 'test' },
                    { title: 'test', link: 'test' },
                    { title: 'test', link: 'test' },
                  ]}
                />
              </div>
            </div>
            <pre>{`
const links = [{
  title: 'test',
  link: 'test
}, {
  title: 'test',
  link: 'test
}]

<LinkList links={links} />
            `}</pre>
          </div>

          <div id="avatar" className="component">
            <h3>Avatar</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Avatar src="/static/demo-images/empieza-avatar.jpg" />
                <Avatar
                  src="/static/demo-images/empieza-avatar.jpg"
                  width={60}
                />
                <Avatar
                  src="/static/demo-images/empieza-avatar.jpg"
                  width={30}
                />
              </div>
              <div className="item-wrapper">
                <Avatar />
                <Avatar width={60} />
                <Avatar width={30} />
              </div>

              <div className="item-wrapper">
                <Avatar loading={true} />
                <Avatar loading={true} width={60} />
                <Avatar loading={true} width={30} />
              </div>
            </div>
            <pre>{`
<Avatar />
            `}</pre>
          </div>

          <div id="badge" className="component">
            <h3>Badge</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Badge>47</Badge>
              </div>   
              <div className="item-wrapper">
                <Badge>2 reactions</Badge>
              </div>    
              <div className="item-wrapper">
                <Badge featured={true}>New</Badge>
              </div>    
              <div className="item-wrapper">
                <Badge featured={true}></Badge>
              </div>   
            </div>
            <pre>{`
<Badge>47</Badge>
            `}</pre>
          </div>

          <div id="button" className="component">
            <h3>Button</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Button>Button example</Button>
              </div>

              <div className="item-wrapper">
                <Button big={true}>Button example</Button>
              </div>

              <div className="item-wrapper">
                <Button loading={true}></Button>
              </div>

              <div className="item-wrapper">
                <Button alt={true}>Button example</Button>
              </div>

              <div className="item-wrapper">
                <Button alt={true} big={true}>
                  Button example
                </Button>
              </div>

              <div className="item-wrapper">
                <Button alt={true} loading={true}></Button>
              </div>
            </div>
            <pre>{`
<Button />
            `}</pre>
          </div>

          <div id="toggle" className="component">
            <h3>Toggle</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Toggle />
              </div>
             
            </div>
            <pre>{`
<Toggle />
            `}</pre>
          </div>

          <div id="socialshare" className="component">
            <h3>Social Share</h3>
            <div className="component-demo">
              <p>shareUrl defaults to window.location</p>
              <div className="item-wrapper">
                <SocialShare />
              </div>
            </div>
            <pre>{`
<SocialShare shareUrl='' />
            `}</pre>
          </div>

          {/*<div id="select" className="component">
            <h3>Select</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Select value={'ipsum'}>
                  <option>Lorem</option>
                  <option value="ipsum">Ipsum</option>
                </Select>
              </div>

              <div className="item-wrapper">
                <Select
                  value={'ipsum'}
                  prefixes={[
                    {
                      value: 'lorem',
                      prefix: (
                        <img
                          style={{ maxWidth: '100%' }}
                          src="https://i.picsum.photos/id/519/50/50.jpg"
                        />
                      ),
                    },
                    {
                      value: 'ipsum',
                      prefix: (
                        <img
                          style={{ maxWidth: '100%' }}
                          src="https://i.picsum.photos/id/212/50/50.jpg"
                        />
                      ),
                    },
                  ]}
                >
                  <option value="lorem">Lorem</option>
                  <option value="ipsum">Ipsum</option>
                </Select>
              </div>
            </div>
            <pre>{`
<Select name='' onChange={} >
  <option value="something">Something</option>
</Select>

<Select value={'ipsum'} prefixes={[{
  value: 'lorem',
  prefix: <img style={{'max-width': '100%' }}
  src="https://i.picsum.photos/id/519/50/50.jpg" />
  }, {
  value: 'ipsum',
  prefix: <img style={{'max-width': '100%' }}
  src="https://i.picsum.photos/id/212/50/50.jpg" />
  }]}>
  <option value='lorem'>Lorem</option>
  <option value='ipsum'>Ipsum</option>
</Select>
            `}</pre>
          </div> */}

          <div id="themeselector" className="component">
            <h3>Theme Selector</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <ThemeSelector selectedTheme="Robot" />
              </div>
            </div>
            <pre>{`
<ThemeSelector selectedTheme='Light' />
            `}</pre>
          </div>

          <div id="contentsummaryview" className="component">
            <h3>Content Summary View</h3>
            <div className="component-demo">
              <p>
                See <b>Content Types</b> documentation for more details
              </p>
              <div className="item-wrapper">
                <ContentSummaryView
                  type={demoContentType}
                  content={demoContent}
                />
              </div>

              <div className="item-wrapper">
                <ContentSummaryView
                  type={demoContentType}
                  content={demoContentWithImage}
                />
              </div>
            </div>
            <pre>{`
<ContentSummaryView type={demoContentType} content={demoContent} />
            `}</pre>
          </div>

          <div id="image" className="component">
            <h3>Image</h3>
            <div className="component-demo">
              <p>
                A "gracefully" loading image. If multiple images are passed it will display a carousel.
              </p>
              <div className="item-wrapper">
                <Image srcs={['https://loremflickr.com/240/240/food?random=1', 'https://loremflickr.com/240/240/food?random=2', 'https://loremflickr.com/240/240/food?random=3']} />
              </div>

              <div className="item-wrapper">
                <Image srcs={['https://loremflickr.com/240/240/cars?random=1']} />
              </div>

              <div className="item-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
                <Image srcs={[{
                  url: 'https://loremflickr.com/240/240/cars?random=2',
                  quote: 'An amazing picture'
                }] } width={500} height={500} />
              </div>

              <div className="item-wrapper">
                <Image srcs={[{
                  url: 'https://loremflickr.com/240/240/flower?random=1',
                  quote: 'An amazing flower'
                }, {
                  url: 'https://loremflickr.com/240/240/flower?random=2',
                  quote: 'Another flower'
                }]} />
              </div>
            </div>
            <pre>{`
 <Image srcs={['https://loremflickr.com/240/240/cars?random=1']} />

 <Image srcs={[{
  url: 'https://loremflickr.com/240/240/cars?random=2',
  quote: 'An amazing picture'
  }]} />
            `}</pre>
          </div>

          <div id="form-elements" className="component">
            <h3>Form Elements (CSS)</h3>
            <div className="component-demo">
              <div className="item-wrapper" id="select">
                <div className="input-group">
                  <label for="demo-select">Select example</label>
                  <div className="input-select">
                    <select id="demo-select">
                      <option>Select example</option>
                      <option>Select example 2</option>
                      <option>Select example 3</option>
                      <option>Select example 4</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="item-wrapper" id="input-radio">
                <div className="input-group">
                  <label for="demo-radio">Radio example</label>
                  <div className="input-radio-group">
                    <div className="input-radio">
                      <input
                        type="radio"
                        id="demo-radio1"
                        name="demo-radio-group"
                      ></input>
                      <label for="demo-radio1">Always</label>
                    </div>
                    <div className="input-radio">
                      <input
                        type="radio"
                        id="demo-radio2"
                        name="demo-radio-group"
                      ></input>
                      <label for="demo-radio2">Sometimes</label>
                    </div>
                    <div className="input-radio">
                      <input
                        type="radio"
                        id="demo-radio3"
                        name="demo-radio-group"
                      ></input>
                      <label for="demo-radio3">Never</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item-wrapper" id="input-text">
                <div className="input-group required">
                  <label for="demo-input-text">Input text example</label>
                  <input
                    type="text"
                    id="demo-input-text"
                    placeholder="Input text example"
                  ></input>
                </div>
              </div>

              <div className="item-wrapper" id="textarea">
                <div className="input-group">
                  <label for="demo-textarea">Textarea example</label>
                  <textarea
                    id="demo-textarea"
                    placeholder="Textarea example"
                  ></textarea>
                </div>
              </div>

              <div className="item-wrapper">
                <div className="input-group error">
                  <label for="demo-input-text-error">Input text example</label>
                  <input
                    type="text"
                    id="demo-input-text-error"
                    placeholder="Input text example"
                  ></input>
                  <span className="error-message">This is an error message</span>
                </div>
              </div>
            </div>
            <pre>{`
<select><option>Example</option></select>

<input type="text" placeholder="Example input"></input>

<textarea placeholder="Example textarea"></textarea>

            `}</pre>
          </div>

          <div id="form-elements-dynamic" className="component">
            <h3>Form Elements Dynamic</h3>
            <p>See the documentation for more information about dynamic fields</p>
            <div className="component-demo">
              <div className="item-wrapper">
                <div >
                  {dynamicFields.map(f => {
                    return (
                      <DynamicField field={f} value={null} onChange={() => {}} />
                    )
                  })}

                </div>
              </div>

            </div>
            <pre>{`
{dynamicFields.map(f => {
  return <DynamicField field={f} value={null} onChange={() => {}} />
})}
            `}</pre>
          </div>
          
          <div id="tagsinput" className="component">
            <h3>Tags Input</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <TagsInput placeholder="Add some tags" />
              </div>

              <div className="item-wrapper">
                <TagsInput
                  defaultTags={[
                    { label: 'Software', slug: 'software' },
                    { label: 'Web dev', slug: 'web-dev' },
                  ]}
                  placeholder="Your tags"
                />
              </div>
            </div>
            <pre>{`
<TagsInput onChange={} placeholder="Your tags" defaultTags={[{label: 'Something', slug: 'another'}]}/>
  `}</pre>
          </div>

          <div id="table" className="component">
            <h3>Table</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Table
                  headerCells={[
                    <TableCellHeader>User</TableCellHeader>,
                    <TableCellHeader>Email</TableCellHeader>,
                    <TableCellHeader>Last Activity</TableCellHeader>,
                    <TableCellHeader>Actions</TableCellHeader>,
                  ]}
                >
                  <TableRowBody>
                    <TableCellBody>
                      {' '}
                      <Avatar
                        src="/static/demo-images/empieza-avatar.jpg"
                        width={30}
                      />
                      Rafael Ventura
                    </TableCellBody>
                    <TableCellBody>rafael@etereo.io</TableCellBody>
                    <TableCellBody>Today</TableCellBody>
                    <TableCellBody>
                      <Button>Delete</Button>
                    </TableCellBody>
                  </TableRowBody>
                  <TableRowBody>
                    <TableCellBody>
                      {' '}
                      <Avatar
                        src="/static/demo-images/empieza-avatar.jpg"
                        width={30}
                      />
                      Hayder Al-Deen
                    </TableCellBody>
                    <TableCellBody>hayder@etereo.io</TableCellBody>
                    <TableCellBody>Today</TableCellBody>
                    <TableCellBody>
                      <Button>Delete</Button>
                    </TableCellBody>
                  </TableRowBody>
                  <TableRowBody>
                    <TableCellBody>
                      {' '}
                      <Avatar
                        src="/static/demo-images/empieza-avatar.jpg"
                        width={30}
                      />
                      Rafael Ventura
                    </TableCellBody>
                    <TableCellBody>rafael@etereo.io</TableCellBody>
                    <TableCellBody>Today</TableCellBody>
                    <TableCellBody>
                      <Button>Delete</Button>
                    </TableCellBody>
                  </TableRowBody>
                  <TableRowBody>
                    <TableCellBody>
                      {' '}
                      <Avatar
                        src="/static/demo-images/empieza-avatar.jpg"
                        width={30}
                      />
                      Hayder Al-Deen
                    </TableCellBody>
                    <TableCellBody>hayder@etereo.io</TableCellBody>
                    <TableCellBody>Today</TableCellBody>
                    <TableCellBody>
                      <Button>Delete</Button>
                    </TableCellBody>
                  </TableRowBody>
                  <TableRowBody>
                    <TableCellBody>
                      {' '}
                      <Avatar
                        src="/static/demo-images/empieza-avatar.jpg"
                        width={30}
                      />
                      Rafael Ventura
                    </TableCellBody>
                    <TableCellBody>rafael@etereo.io</TableCellBody>
                    <TableCellBody>Today</TableCellBody>
                    <TableCellBody>
                      <Button>Delete</Button>
                    </TableCellBody>
                  </TableRowBody>
                </Table>
              </div>
            </div>
            <pre>{`
<Table
  //Header Sections
  headerCells={[
    <TableCellHeader>User</TableCellHeader>,
    <TableCellHeader>Email</TableCellHeader>,
    <TableCellHeader>Last Activity</TableCellHeader>,
    <TableCellHeader>Actions</TableCellHeader>,
  ]}
  >
  //Body Content Unit
  <TableRowBody>
    <TableCellBody>
      <Avatar/> User Name
    </TableCellBody>
    <TableCellBody>
      user@user.com
    </TableCellBody>
    <TableCellBody>
      Today
    </TableCellBody>
    <TableCellBody>
      <Button>Delete</Button>
    </TableCellBody>
  </TableRowBody>
</Table>
  `}</pre>
          </div>

          <div id="videorecorder" className="component">
            <h3>Video Recorder</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <VideoRecorder />
              </div>

              
            </div>
            <pre>{`
<VideoRecorder />
  `}</pre>
          </div>

          <div id="upload" className="component">
            <h3>upload</h3>
            <div className="component-demo">
              <div className="item-wrapper">
                <Upload />
              </div>

              
            </div>
            <pre>{`
<Upload />
  `}</pre>
          </div>
        
          <div id="map" className="component">
            <h3>Map</h3>
            <div className="component-demo">
              <div className="item-wrapper" style={{ height: '400px'}}>
                <Map />
              </div>

              
            </div>
            <pre>{`
<Map />
  `}</pre>
          </div>
        
        
        </div>

      </div>
      <style jsx>{`
        h1 {
          padding-left: var(--empz-gap-double);
          margin-bottom: var(--empz-gap);
        }
        .components-layout {
          align-items: flex-start;
          display: flex;
          flex-wrap: wrap;
        }

        .components-layout h3{
          font-size: 24px;
        }

        @media (max-width: 780px) {
          .components-layout {
            flex-direction: column;
          }
        }

        .list-menu {
          background: var(--accents-1);
          overflow: scroll;
          position: sticky;
          top: 56px;
          padding: var(--empz-gap-double);
          box-sizing: border-box;
          height: 100vh;
          z-index: 3;
        }

        .list-menu::-webkit-scrollbar {
          width: 10px;
        }

        .list-menu::-webkit-scrollbar-thumb {
          background: var(--accents-3);
        }

        .list-menu::-webkit-scrollbar-track {
          background: var(--accents-1);
        }

        .list-menu .submenu a::after {
          background: transparent;
          border-bottom: 2px solid var(--accents-6);
          border-right: 2px solid var(--accents-6);
          content: '';
          display: inline-block;
          height: 8px;
          margin: 0 0 2px 8px;
          transform: rotate(45deg);
          transform-origin: 50% 50%;
          transition: 0.3s ease;
          width: 8px;
        }

        .list-menu .submenu ul li a::after {
          display: none;
        }

        .list-menu .submenu ul {
          max-height: 0;
          border-left: 2px solid var(--accents-2);
          opacity: 0;
          overflow: hidden;
          transition: 0.3s ease;
          padding-left: var(--empz-gap-half);
          margin-left: var(--empz-gap-half);
          visibility: hidden;
        }

        .list-menu .submenu:hover ul {
          max-height: 260px;
          opacity: 1;
          visibility: visible;
        }

        .list-menu .submenu:hover a::after {
          transform: rotate(-135deg) translate(-2px, -2px);
        }

        .list-menu h3 {
          padding: var(--empz-gap-half) 0 var(--empz-gap);
        }

        .list-menu ul {
          list-style: none;
        }

        .list-menu li a {
          color: var(--accents-6);
          font-size: 14px;
          font-weight: 500;
          padding: var(--empz-gap-half);
          display: block;
          text-decoration: none;
        }

        .list-menu li a:hover {
          background: var(--accents-2);
          border-radius: var(--empz-radius);
        }

        .components {
          padding: var(--empz-gap-double);
          background: var(--empz-background);
          color: var(--empz-foreground);
          margin-left: var(--empz-gap);
          max-width: var(--empz-page-extra-width);
          flex: 1;
        }

        .item-wrapper {
          margin-top: var(--empz-gap);
          margin-bottom: var(--empz-gap);
          display-flex;
          align-items: center;
          justify-content: flex-start;
        }

        .components pre {
          background: var(--empz-background);
          box-sizing: border-box;
          color: var(--accents-5);
          padding: var(--empz-gap-double) var(--empz-gap) var(--empz-gap);
          border: 1px solid var(--accents-2);
          border-radius: var(--empz-radius);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          position: relative;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .components pre::before {
          border-top-left-radius: var(--empz-radius);
          border-top-right-radius: var(--empz-radius);
          box-sizing: border-box;
          content: 'Code';
          position: absolute;
          top: 0;
          left: 0;
          padding: 8px var(--empz-gap);
          background: var(--accents-1);
          width: 100%;
        }

        @media (max-width: 780px) {
          .components pre {
            margin: 0;
            padding: 16px;
          }

          .components {
            margin: 0;
          }
        }

        .component {
          padding: calc(var(--empz-gap-double) * 1.6) var(--empz-gap-double)
            var(--empz-gap-double);
        }
        
        #form-elements .component-demo{
          margin: 40px 0;
          max-width: 520px;
        }

        #form-elements .item-wrapper{
          margin: 0;
        }

        .component h3  {
          font-size: 24px;
        }

        .component p {
          color: var(--accents-4);
          display: block;
          padding-top: var(--empz-gap-half);
        }

        @media all and (max-width: 960px) {
          .list-menu {
            position: fixed;
            transform: translateX(-100%);
          }

          .components {
            margin-left: 0;
            padding: var(--empz-gap-double) 0;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Components
