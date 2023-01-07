import Layout from "../components/layout";
import Head from 'next/head';
import { TOKEN, DATABASE_ID } from '../config/index';
import ProjectItem from "../components/projects/project-item";


export default function Projects({projects}) {
    return (
        <Layout>
            <Head>
                <title>포트폴리오</title>
                <meta name='description' content='내용' />
                <link rel='icon' href='/fabicon.ico' />
            </Head>
            <h1 className="text-4xl font-bold sm:text-6xl">
                    총 프로젝트 :
                    <span className="pl-4 text-blue-500">{projects.results.length}</span>
                </h1>

                <div className="grid grid-cols-1 gap-8 p-12 m-4 md:grid-cols-2">
                    {projects.results.map((aProject) => (
                        <ProjectItem key={aProject.id} data={aProject}/>
                    ))}
                </div>
        </Layout>
    );
}

// 빌드 타임에 호출
// export async function getStaticProps

// 각 요청때마다 호출
export async function getServerSideProps() {

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Notion-Version': '2022-02-22',
          'content-type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            sorts: [
                {
                    "property": "이름",
                    "direction": "ascending"
                }
            ],
            page_size: 100
        })
      };
      
      const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
    
      const projects = await res.json()
      
      const projectNames = projects.results.map((aProject) => {
        if (aProject.properties.이름.title[0] != undefined) {
            return aProject.properties.이름.title[0].plain_text
        }
        
        }).filter(aProject => aProject);

      console.log(projects.results[0].properties.WorkPeriod)

    return {
      props: {projects}, // will be passed to the page component as props
    }
  }