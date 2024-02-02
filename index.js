// src/index.ts
import { createApp } from "vue";

// src/components/TrackRoot.ts
import { defineComponent as defineComponent2 } from "vue";

// src/components/getTemplate.ts
var getTemplate = ({
  templateRoot,
  dataInjects,
  templateInjects,
  templateReplaces,
  withVModel,
  withAttrs,
  shouldSkipRoot
}) => {
  const templateRootQueryString = templateRoot.startsWith(".") || templateRoot.startsWith("#") ? templateRoot : `[data-bdtl="${templateRoot}"]`;
  const templateRootElement = document.querySelector(templateRootQueryString);
  if (!templateRootElement) {
    return "";
  }
  const templateElement = templateRootElement.cloneNode(true);
  if (dataInjects) {
    Object.entries(dataInjects).forEach(([key, value]) => {
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`);
      elements.forEach((element) => {
        element.textContent = `{{${value}}}`;
      });
    });
  }
  if (templateInjects) {
    Object.entries(templateInjects).forEach(([key, value]) => {
      if (key === "&") {
        templateElement.innerHTML = value;
        return;
      }
      if (key.startsWith(".") || key.startsWith("#")) {
        const element = templateElement.querySelectorAll(key);
        element.forEach((element2) => {
          element2.innerHTML = value;
        });
        return;
      }
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`);
      elements.forEach((element) => {
        element.innerHTML = value;
      });
    });
  }
  if (templateReplaces) {
    Object.entries(templateReplaces).forEach(([key, value]) => {
      if (key === "&") {
        templateElement.outerHTML = value;
        return;
      }
      if (key.startsWith(".") || key.startsWith("#")) {
        const element = templateElement.querySelectorAll(key);
        element.forEach((element2) => {
          element2.outerHTML = value;
        });
        return;
      }
      const elements = templateElement.querySelectorAll(`[data-bdtl="${key}"]`);
      elements.forEach((element) => {
        element.outerHTML = value;
      });
    });
  }
  if (withVModel) {
    Object.entries(withVModel).forEach(([key, value]) => {
      const element = templateElement.querySelector(`[data-bdtl="${key}"]`);
      if (element) {
        element.setAttribute("v-model", value);
      }
    });
  }
  if (withAttrs) {
    Object.entries(withAttrs).forEach(([key, value]) => {
      const element = templateElement.querySelector(`[data-bdtl="${key}"]`);
      if (element) {
        Object.entries(value).forEach(([attr, attrValue]) => {
          element.setAttribute(attr, attrValue);
        });
      }
    });
  }
  return shouldSkipRoot ? templateElement.innerHTML : templateElement.outerHTML;
};

// src/components/TrackPoint.ts
import { defineComponent } from "vue";
var createTrackPointVariant = (variant) => defineComponent({
  template: getTemplate({
    templateRoot: `track-point--${variant}`,
    dataInjects: {
      "track-point__number": "number",
      "track-point__name": "name"
    }
  }),
  props: {
    number: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
});
var TrackPointOpen = createTrackPointVariant("open");
var TrackPointCurrent = createTrackPointVariant("current");
var TrackPointDone = createTrackPointVariant("done");
var createTrackTrackVariant = (variant) => defineComponent({
  template: getTemplate({
    templateRoot: `track-track--${variant}`
  })
});
var TrackTrackOpen = createTrackTrackVariant("open");
var TrackTrackDone = createTrackTrackVariant("done");
var TrackPoint_default = defineComponent({
  template: (
    /* html */
    `
    <track-point-open 
      v-if="trackPoint.status === 'open'"
      :number="trackPoint.number"
      :name="trackPoint.name" @click.native="$emit('click')"
    />
    <track-point-current 
      v-if="trackPoint.status === 'current'"
      :number="trackPoint.number"
      :name="trackPoint.name"
      @click.native="$emit('click')"
    />
    <track-point-done
      v-if="trackPoint.status === 'done'"
      :number="trackPoint.number"
      :name="trackPoint.name"
      @click.native="$emit('click')"
    />
    <template v-if="withTrack">
      <track-track-open v-if="withTrack === 'open'" />
      <track-track-done v-if="withTrack === 'done'" />
    </template>
  `
  ),
  emits: ["click"],
  props: {
    trackPoint: {
      type: Object,
      required: true
    },
    withTrack: {
      type: String,
      required: false
    }
  },
  components: {
    TrackPointOpen,
    TrackPointCurrent,
    TrackPointDone,
    TrackTrackOpen,
    TrackTrackDone
  },
  setup(props) {
    return {};
  }
});

// src/data/trackPoints.ts
import { computed as computed2 } from "vue";

// src/data/questions.ts
import { computed, ref } from "vue";
var getWeightedText = (textRaw, defaultWeight = 0) => {
  const [, weightRaw, text] = textRaw.match(/\[([-+]?\d+)\](.*)/m) || [];
  const weight = parseInt(weightRaw || "") || defaultWeight;
  return { weight, text: text || textRaw };
};
var getQuestionsData = () => {
  const questionElements = document.querySelectorAll('[data-bdtl="question"]');
  const questionsData = [...questionElements].map((element) => {
    const titleRaw = element.querySelector('[data-bdtl="question__title"]')?.textContent?.trim() || "";
    const { weight, text: title } = getWeightedText(titleRaw, 1);
    const question = element.querySelector('[data-bdtl="question__question"]')?.textContent?.trim() || "";
    const answerElements = element.querySelectorAll('[data-bdtl="answer"]');
    const answers = [...answerElements].map((element2) => {
      const labelRaw = element2.querySelector('[data-bdtl="answer__label"]')?.textContent?.trim() || "";
      const { weight: weight2, text: label } = getWeightedText(labelRaw);
      return {
        label: label || labelRaw,
        value: null,
        weight: weight2
      };
    });
    return {
      title,
      question,
      weight,
      answers
    };
  });
  return questionsData;
};
var allQuestions = getQuestionsData();
var currentQuestionIndex = ref(0);
var currentAnswers = ref({});
var isNegativeAnswer = (answer) => {
  return answer.weight < 0;
};
var deactivateOppositeAnswers = ({
  questionIndex,
  answerIndex
}) => {
  const answers = allQuestions[questionIndex]?.answers;
  const checkedAnswer = answers?.[answerIndex];
  if (!checkedAnswer)
    return;
  answers.forEach((answer, index) => {
    if (isNegativeAnswer(answer) === isNegativeAnswer(checkedAnswer)) {
      return;
    }
    currentAnswers.value[questionIndex] = {
      ...currentAnswers.value[questionIndex],
      [index]: false
    };
  });
};
var useQuestions = () => {
  const allQuestionsComputed = computed(
    () => allQuestions.map((question, questionIndex) => {
      return {
        ...question,
        answers: question.answers.map((answer, answerIndex) => {
          return {
            ...answer,
            value: currentAnswers.value[questionIndex]?.[answerIndex] ?? null
          };
        })
      };
    })
  );
  const currentQuestionIndexComputed = computed(
    () => currentQuestionIndex.value
  );
  const currentQuestion = computed(() => {
    return allQuestionsComputed.value[currentQuestionIndex.value];
  });
  const incrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value = (currentQuestionIndex.value + 1) % allQuestionsComputed.value.length;
  };
  const decrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value = Math.abs(currentQuestionIndex.value - 1) % allQuestionsComputed.value.length;
  };
  const setCurrentQuestionIndex = (index) => {
    currentQuestionIndex.value = Math.abs(index) % allQuestionsComputed.value.length;
  };
  const setCurrentQuestionAnswer = (index, value) => {
    deactivateOppositeAnswers({
      questionIndex: currentQuestionIndex.value,
      answerIndex: index
    });
    currentAnswers.value[currentQuestionIndex.value] = {
      ...currentAnswers.value[currentQuestionIndex.value],
      [index]: value
    };
  };
  return {
    allQuestions: allQuestionsComputed,
    currentQuestionIndex: currentQuestionIndexComputed,
    currentQuestion,
    incrementCurrentQuestionIndex,
    decrementCurrentQuestionIndex,
    setCurrentQuestionIndex,
    setCurrentQuestionAnswer
  };
};

// src/data/trackPoints.ts
var useTrackPoints = () => {
  const { allQuestions: allQuestions2, currentQuestionIndex: currentQuestionIndex2 } = useQuestions();
  const isQuestionDone = (questionIndex) => {
    const questionAnswers = allQuestions2.value[questionIndex]?.answers;
    if (!questionAnswers) {
      return false;
    }
    return Object.values(questionAnswers).some(({ value }) => value);
  };
  const trackPoints = computed2(() => {
    return allQuestions2.value.map((question, questionIndex) => {
      return {
        number: String(questionIndex + 1),
        name: question.title,
        status: currentQuestionIndex2.value === questionIndex ? "current" : isQuestionDone(questionIndex) ? "done" : "open"
      };
    });
  });
  return {
    trackPoints
  };
};

// src/components/TrackRoot.ts
var TrackRoot_default = defineComponent2({
  template: getTemplate({
    templateRoot: "track-root",
    templateInjects: {
      "&": (
        /* html */
        `
        <template v-for="(trackPoint, index) in trackPoints">
          <track-point 
            :track-point="trackPoint" 
            :with-track="isLastTrackPoint(index) ? undefined : isTrackDone(index) ? 'done' : 'open'"
            @click="setCurrentQuestionIndex(index)"
          />
        </template>
      `
      )
    }
  }),
  setup() {
    const { trackPoints } = useTrackPoints();
    const { setCurrentQuestionIndex } = useQuestions();
    const isTrackDone = (index) => trackPoints.value.slice(0, index + 1).every((trackPoint) => trackPoint.status === "done");
    const isLastTrackPoint = (index) => index === trackPoints.value.length - 1;
    return {
      isTrackDone,
      isLastTrackPoint,
      trackPoints,
      setCurrentQuestionIndex
    };
  },
  components: {
    TrackPoint: TrackPoint_default
  }
});

// src/components/QuestionRoot.ts
import { computed as computed5, defineComponent as defineComponent6 } from "vue";

// src/components/Question.ts
import { computed as computed4, defineComponent as defineComponent4, toRefs } from "vue";

// src/components/Answer.ts
import { defineComponent as defineComponent3, computed as computed3 } from "vue";
var Answer_default = defineComponent3({
  template: getTemplate({
    templateRoot: "answer",
    dataInjects: {
      answer__label: "label"
    },
    withVModel: {
      answer__checkbox: "value"
    },
    withAttrs: {
      answer__checkbox: {
        ":id": "id"
      },
      answer__label: {
        ":for": "id"
      }
    }
  }),
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: [Boolean]
    }
  },
  emits: ["update:model-value"],
  setup(props, { emit }) {
    const value = computed3({
      get() {
        return props.modelValue;
      },
      set(value2) {
        emit("update:model-value", value2);
      }
    });
    return {
      value,
      id: `answer-${Math.random().toString(36).substr(2, 9)}`
    };
  }
});

// src/components/Question.ts
var Question_default = defineComponent4({
  template: getTemplate({
    templateRoot: "question",
    dataInjects: {
      question__title: "title",
      question__question: "question"
    },
    templateInjects: {
      "answer-root": (
        /* html */
        `
        <answer
          v-for="(answer, index) in answers"
          :key="index"
          :label="answer.label"
          :model-value="answer.value"
          @update:model-value="$emit('update:answer', { index, value: $event })"
        />
      `
      )
    }
  }),
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  components: {
    Answer: Answer_default
  },
  emits: ["update:answer"],
  setup(props) {
    const { question } = toRefs(props);
    return {
      title: computed4(() => question.value.title),
      question: computed4(() => question.value.question),
      answers: computed4(() => question.value.answers)
    };
  }
});

// src/components/QuestionArrow.ts
import { defineComponent as defineComponent5 } from "vue";
var QuestionArrowLeft = defineComponent5({
  template: getTemplate({
    templateRoot: "question-arrow--left"
  })
});
var QuestionArrowRight = defineComponent5({
  template: getTemplate({
    templateRoot: "question-arrow--right"
  })
});
var QuestionArrow_default = defineComponent5({
  template: (
    /* html */
    `
    <question-arrow-left v-if="direction === 'left'" @click.native="$emit('click')" />
    <question-arrow-right v-if="direction === 'right'" @click.native="$emit('click')" />
  `
  ),
  emits: ["click"],
  props: {
    direction: {
      type: String,
      required: true
    }
  },
  components: {
    QuestionArrowLeft,
    QuestionArrowRight
  }
});

// src/components/QuestionRoot.ts
var QuestionRoot_default = defineComponent6({
  template: getTemplate({
    templateRoot: "question-root",
    templateInjects: {
      "question-container": (
        /* html */
        `
        <Transition 
          mode="out-in"
          class="duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <question :question="currentQuestion" :key="currentQuestionKey" @update:answer="setCurrentQuestionAnswer($event.index, $event.value)"/>
        </Transition>
      `
      )
    },
    templateReplaces: {
      "question-arrow--left": (
        /* html */
        `
        <question-arrow direction="left" @click="onArrowLeft" />
      `
      ),
      "question-arrow--right": (
        /* html */
        `
        <question-arrow direction="right" @click="onArrowRight" />
      `
      )
    }
  }),
  props: {},
  setup() {
    const {
      currentQuestion,
      incrementCurrentQuestionIndex,
      decrementCurrentQuestionIndex,
      setCurrentQuestionAnswer
    } = useQuestions();
    const onArrowLeft = async () => {
      decrementCurrentQuestionIndex();
    };
    const onArrowRight = async () => {
      incrementCurrentQuestionIndex();
    };
    const currentQuestionKey = computed5(() => {
      return currentQuestion.value?.title || "";
    });
    return {
      currentQuestion,
      currentQuestionKey,
      onArrowLeft,
      onArrowRight,
      setCurrentQuestionAnswer
    };
  },
  components: {
    Question: Question_default,
    QuestionArrow: QuestionArrow_default
  }
});

// src/components/EvaluationRoot.ts
import { computed as computed7, defineComponent as defineComponent8 } from "vue";

// src/components/EvaluationPoint.ts
import { defineComponent as defineComponent7 } from "vue";

// src/data/evaluation.ts
import { computed as computed6 } from "vue";
var getEvaluationData = () => {
  const evaluationTextRaw = document.querySelector('[data-bdtl="evaluation-text"]')?.textContent || "";
  const evaluationTexts2 = evaluationTextRaw.split("|").map((text) => text.trim());
  return evaluationTexts2;
};
var evaluationTexts = getEvaluationData();
var MULTI_SELECT_FACTOR = 0.75;
var calculateScoreOfSelectedAnswers = (answers) => {
  const checkedAnswers = answers.filter((answer) => answer.value);
  const factor = checkedAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1;
  const scoreRaw = checkedAnswers.reduce((score, answer) => {
    return score + answer.weight;
  }, 0);
  return scoreRaw * factor;
};
var calculateScoreOfMaxAnswers = (answers) => {
  const positiveAnswers = answers.filter((answer) => answer.weight > 0);
  const factor = positiveAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1;
  const scoreRaw = positiveAnswers.reduce((score, answer) => {
    return score + answer.weight;
  }, 0);
  return scoreRaw * factor;
};
var calculateScoreOfMinAnswers = (answers) => {
  const negativeAnswers = answers.filter((answer) => answer.weight < 0);
  const factor = negativeAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1;
  const scoreRaw = negativeAnswers.reduce((score, answer) => {
    return score + answer.weight;
  }, 0);
  return scoreRaw * factor;
};
var useEvaluation = () => {
  const { allQuestions: allQuestions2 } = useQuestions();
  const score = computed6(() => {
    const currentScore = allQuestions2.value.reduce((score2, question) => {
      const questionScore = calculateScoreOfSelectedAnswers(question.answers);
      return score2 + questionScore * question.weight;
    }, 0);
    const maxScore = allQuestions2.value.reduce((score2, question) => {
      const questionScore = calculateScoreOfMaxAnswers(question.answers);
      return score2 + questionScore * question.weight;
    }, 0);
    const minScore = allQuestions2.value.reduce((score2, question) => {
      const questionScore = calculateScoreOfMinAnswers(question.answers);
      return score2 + questionScore * question.weight;
    }, 0);
    return currentScore >= 0 ? 50 + currentScore / maxScore * 50 : 50 - currentScore / minScore * 50;
  });
  const evaluationText = computed6(() => {
    const evaluationTextIndex = Math.floor(
      score.value * 0.01 * (evaluationTexts.length - 1e-6)
    );
    return evaluationTexts[evaluationTextIndex];
  });
  const isFinished = computed6(() => {
    return allQuestions2.value.every(
      (question) => question.answers.some((answer) => answer.value)
    );
  });
  return {
    score,
    evaluationText,
    isFinished
  };
};

// src/components/EvaluationPoint.ts
var EvaluationPoint_default = defineComponent7({
  template: getTemplate({
    templateRoot: "evaluation-point",
    dataInjects: {
      "evaluation-text": "evaluationText"
    }
  }),
  components: {},
  setup() {
    const { evaluationText } = useEvaluation();
    return {
      evaluationText
    };
  }
});

// src/components/EvaluationRoot.ts
var EvaluationRoot_default = defineComponent8({
  template: getTemplate({
    templateRoot: "evaluation-root",
    templateReplaces: {
      "evaluation-point": (
        /* html */
        `
        <evaluation-point :style="style" />
      `
      )
    }
  }),
  components: {
    EvaluationPoint: EvaluationPoint_default
  },
  setup() {
    const { score } = useEvaluation();
    const style = computed7(() => ({
      left: `${score.value}%`
    }));
    return {
      style
    };
  }
});

// src/components/FinishRoot.ts
import { defineComponent as defineComponent9 } from "vue";
var FinishRoot_default = defineComponent9({
  template: getTemplate({
    templateRoot: "finish-root"
  })
});

// src/index.ts
createApp({
  template: getTemplate({
    templateRoot: "#bdtl-app",
    shouldSkipRoot: true,
    templateReplaces: {
      "track-root": (
        /* html */
        `
        <track-root />
      `
      ),
      "question-root": (
        /* html */
        `
        <question-root />
      `
      ),
      "evaluation-root": (
        /* html */
        `
        <evaluation-root />
      `
      ),
      "finish-root": (
        /* html */
        `
        <finish-root v-if="isFinished" />
      `
      )
    }
  }),
  components: {
    TrackRoot: TrackRoot_default,
    QuestionRoot: QuestionRoot_default,
    EvaluationRoot: EvaluationRoot_default,
    FinishRoot: FinishRoot_default
  },
  setup() {
    const { isFinished } = useEvaluation();
    return {
      isFinished
    };
  }
}).mount("#bdtl-app");
//# sourceMappingURL=index.js.map