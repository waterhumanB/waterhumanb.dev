import React from "react"
import Image from "next/image"
import styles from "./projectLayout.module.scss"
import { projectData } from "../../../data/projectData"

function ProjectLayout() {
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Project</h2>
        <p>
          개발을 하면서 팀 또는 개인으로 진행한 프로젝트 저의 작품들을 소개하는
          곳입니다.
        </p>
      </div>
      <div className={styles.projectContainer}>
        {projectData.map((data) => {
          return (
            <div className={styles.projectBox} key={data.title}>
              <div className={styles.imgBox}>
                <Image
                  width={200}
                  height={200}
                  src={data.thumbnail}
                  alt={data.title}
                />
              </div>
              <div className={styles.desBox}>
                <div className={styles.des}>
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
                </div>
              </div>
              <div className={styles.linkBox}>
                {data.projectURL && (
                  <a target='_blank' href={data.projectURL} rel='noreferrer'>
                    Project
                  </a>
                )}
                {data.git && (
                  <a target='_blank' href={data.git} rel='noreferrer'>
                    GitHub
                  </a>
                )}
                {data.notion && (
                  <a target='_blank' href={data.notion} rel='noreferrer'>
                    Notion
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectLayout
