import { defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import { storeToRefs } from 'pinia'

import editor from '@/store/editor'
import modulesAndModdle from '@/components/Designer/modulesAndModdle'
import initModeler from '@/components/Designer/initModeler'
import { createNewDiagram } from '@/utils'
import type { EditorSettings } from 'types/editor/settings'

const Designer = defineComponent({
  name: 'BpmnDesigner',
  props: {
    xml: {
      type: String as PropType<string>,
      default: undefined
    }
  },
  emits: ['update:xml', 'command-stack-changed'],
  setup(props, { emit }) {
    const editorStore = editor()
    const { editorSettings } = storeToRefs(editorStore)
    const { xml } = toRefs(props)
    const designer: Ref<HTMLDivElement | null> = ref(null)

    const reinitializeModeler = async (
      settings: EditorSettings,
      oldSettings?: EditorSettings,
      xmlContent?: string
    ) => {
      try {
        const modelerModules = modulesAndModdle(editorSettings)
        await initModeler({ designer, modelerModules, emit })
        
        const isEngineChanged = !oldSettings || settings.processEngine !== oldSettings.processEngine
        if (isEngineChanged) {
          await createNewDiagram()
        } else {
          await createNewDiagram(xmlContent, settings)
        }
      } catch (error) {
        console.error('Failed to initialize modeler:', error)
      }
    }

    watch(
      editorSettings,
      async (value, oldValue) => {
        await reinitializeModeler(value, oldValue, xml.value)
      },
      { deep: true, immediate: true }
    )

    return () => <div ref={designer} class="designer"></div>
  }
})

export default Designer
