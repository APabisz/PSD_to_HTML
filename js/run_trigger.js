document.addEventListener("DOMContentLoaded", () => {
  let imgInACircle = document.querySelectorAll(".img-circle-container > li")
  let textsInACircle = document.querySelectorAll(".text-circle-container > li")
  textsInACircle = [].slice.call(textsInACircle, 0).reverse()
  let transformXImg = []
  let transformYImg = []
  let transformXText = []
  let transformYText = []
  let triggerOn = false
  let triggerOnSize = ""
  const mobile_size_event = new Event("mobile")
  let master = gsap.timeline()

  const mobileAnimation = (play) => {
    if (!play) {
      removeAnimation()
      return
    }

    const setProperImgInACircleValues = () => {
      const tl = gsap.timeline({
        repeat: -1,
      })

      tl.set(imgInACircle, { clearProps: "all" })
      tl.set(imgInACircle, { x: "+=0" })

      for (i = 0; i < imgInACircle.length; i++) {
        transformXImg.push(gsap.getProperty(imgInACircle[i], "x"))
        transformYImg.push(gsap.getProperty(imgInACircle[i], "y"))
      }
      transformXImg.push(...transformXImg)
      transformYImg.push(...transformYImg)
    }

    const setProperTextInACircleValues = () => {
      const tl = gsap.timeline({
        repeat: -1,
      })

      tl.set(textsInACircle, { clearProps: "all" })
      tl.set(textsInACircle, { x: "+=0" })

      for (i = 0; i < textsInACircle.length; i++) {
        transformXText.push(gsap.getProperty(textsInACircle[i], "x"))
        transformYText.push(gsap.getProperty(textsInACircle[i], "y"))
      }
      transformXText.push(...transformXText)
      transformYText.push(...transformYText)
    }

    const mainTriggerRotationTimeline = () => {
      const mainTrigger = document.querySelector(
        ".banner-container__img-center"
      )

      const tl = gsap.timeline({
        repeat: 11,
        delay: 3,
      })
      tl.to(mainTrigger, {
        duration: 1,
        rotation: 30,
        delay: 3,
        ease: Power0.easeNone,
      })

      return tl
    }

    // Second timeline for items in a circle
    const imgInACircleTriggerTimeline = () => {
      const tl = gsap.timeline({
        repeat: 0,
        delay: 3,
      })
      const reverseOrderImg = [].slice.call(imgInACircle, 0).reverse()
      setProperImgInACircleValues()
      tl.set(imgInACircle, { clearProps: "all" })
      tl.set(imgInACircle, { borderRadius: "50%" })

      tl.addLabel("item-spin")
      for (i = 0; i < imgInACircle.length; i++) {
        for (j = 0; j < imgInACircle.length; j++) {
          tl.to(
            imgInACircle[i],
            {
              x: transformXImg[i + j + 1],
              y: transformYImg[i + j + 1],
              delay: 3,
              duration: 1,
              ease: Power0.easeNone,
            },
            `item-spin +=${j * 4}`
          )
        }
        tl.to(
          reverseOrderImg[i],
          {
            delay: 3,
            duration: 1,
            boxShadow: "0 0 9px 0px #ccc",
          },
          `item-spin +=${i * 4}`
        )

        tl.to(
          reverseOrderImg[i],
          {
            delay: 3,
            duration: 1,
            boxShadow: "0 0 0px 0px transparent",
          },
          `item-spin +=${i * 4 + 3}`
        )
      }

      return tl
    }

    // Third timeline for texts in a circle
    const textInACircleTriggerTimeline = () => {
      const tl = gsap.timeline({
        repeat: 0,
        delay: 3,
        repeatDelay: 0,
      })

      tl.eventCallback("onComplete", function () {
        mobileAnimation(true)
      })

      setProperTextInACircleValues()

      tl.set(textsInACircle, { clearProps: "all" })
      tl.set(textsInACircle, { x: transformXImg[0], y: transformYImg[0] })
      tl.set(textsInACircle, { x: "-50%" })

      tl.addLabel("item-show")
      for (i = 0; i < textsInACircle.length; i++) {
        tl.to(
          textsInACircle[i],
          {
            y: "-=40",
            delay: 3,
            duration: 1,
            opacity: 1,
            visibility: "visible",
            ease: Power3.EaseOut,
          },
          `item-show +=${i * 4}`
        )
        tl.to(
          textsInACircle[i],
          { y: "-=10", delay: 3, duration: 1, opacity: 0 },
          `item-show +=${i * 4 + 3}`
        )
      }

      return tl
    }

    removeAnimation()

    master = gsap.timeline()

    master.play()

    master.add("start")
    master.add(mainTriggerRotationTimeline(), "start")
    master.add(imgInACircleTriggerTimeline(), "start")
    master.add(textInACircleTriggerTimeline(), "start")
    master.add("end")
  }

  function removeAnimation() {
    master.restart()
    master.pause()

    transformYImg = []
    transformXImg = []
    transformYText = []
    transformXText = []
    imgInACircle.forEach((item) => {
      item.style = ""
    })
    textsInACircle.forEach((item) => {
      item.style = ""
    })
  }

  function handleMobileAnimation() {
    if (triggerOn) {
      mobileAnimation(true)
    } else {
      mobileAnimation(false)
    }
  }

  const checkIfStartAnimation = () => {
    if (window.innerWidth <= 640 && (!triggerOn || triggerOnSize !== "small")) {
      triggerOn = true
      triggerOnSize = "small"

      document.dispatchEvent(mobile_size_event)
    } else if (
      window.innerWidth > 640 &&
      window.innerWidth <= 800 &&
      (!triggerOn || triggerOnSize !== "medium")
    ) {
      triggerOn = true
      triggerOnSize = "medium"

      document.dispatchEvent(mobile_size_event)
    } else if (window.innerWidth > 800 && triggerOn) {
      triggerOn = false
      triggerOnSize = ""

      document.dispatchEvent(mobile_size_event)
    }
  }

  document.addEventListener("mobile", handleMobileAnimation, false)

  window.addEventListener("resize", () => {
    checkIfStartAnimation()
  })

  checkIfStartAnimation()
})
