<template>
  <v-card class="cards-main ml-3">
    <div
      class="x-table__header"
      :style="{'background-color' : theme.colors.nav, 'color' : theme.colors.navIcons}"
    >
      <div>
        <v-text-field
        v-if="(conf.search || {}).show || false"
        v-model="search"
        solo
        :placeholder="$i18n.t(conf.search.text)"
        :color="theme.colors.navIcons + '80'"
        :append-icon="'search'"
        class="x-table__search"
      >
      </v-text-field>
  
      <v-btn
        v-if="pagination"
        @click="searchRows"
        class="x-table__search-button"
      >
        <v-icon>search</v-icon>
      </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :dark="$store.state.theme.colors.nav != '#fff'"
        outline
        @click.native="add"
        class="x-table__add-button"
        :class="{'show-multiple' : showMultiple}"
      >{{ $i18n.t('GENERAL.new') }}</v-btn>

      <v-menu open-on-hover bottom left offset-y>

        <v-btn
          :dark="$store.state.theme.colors.nav != '#fff'"
          outline
          slot="activator"
          v-show="showMultiple"
          class="flechita"
        >
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile v-for="(item, index) in multiple" @click="$emit(item.event)" :key="index">
            <v-list-tile-title class="px-3 pr-5">
              <v-icon style="padding-right:20px" color="#444d61">{{item.icon}}</v-icon>
              {{ item.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <div class="cards-content x-table__overflow">
      <div
        class="x-table__table-header"
        :style="{'background-color' : theme.colors.nav, 'border-top' : '1px solid ' + theme.colors.borders}"
      >
        <div
          :style="{ 'width' : headersWidth + '%' }"
          v-for="(header,index) in conf.headers"
          :key="index"
        >
          {{ $i18n.t(header.name) }}
          <v-icon
            v-show="!filters[header.value]"
            class="x-table__header_arrows"
            @click="filterAtoZ(header.value)"
          >keyboard_arrow_down</v-icon>
          <v-icon
            v-show="filters[header.value]"
            class="x-table__header_arrows"
            @click="filterZtoA(header.value)"
          >keyboard_arrow_up</v-icon>
        </div>
      </div>

      <div
        v-for="( item , index ) in filtered"
        @click="open(item)"
        :key="index"
        class="x-table__item"
      >
        <div
          class="x-table__item-pic"
          :style="{'background-color' : theme.colors.items, 'border-right' : $store.state.theme.colors.items}"
        >
          <v-icon>{{itemIcon}}</v-icon>
        </div>
        <!-- <div class="item-user__header_desc" style="text-transform:uppercase">{{user.name}}  <span style="float: right;top: 2px;position: relative;right: 20px;font-size: 12px;">Created on {{user.dateCreated}}</span></div> -->
        <div class="x-table__content" @click="open(item)">
          <div
            :style="{'width': headersWidth -1 +'%','text-align': header.align || 'center'}"
            v-for="(header,index) in conf.headers"
            :key="index"
          >{{typeof item[header.value] != "object" ? item[header.value] : (item[header.value] || {}).name || ""}}</div>
          <div v-on:click.stop class="x-table__checkbox">
            <v-checkbox v-model="selectedItems" :value="item" color="x-theme__color"></v-checkbox>
          </div>
        </div>
      </div>
      <v-alert
        style="margin: 27px;"
        v-show="!filtered.length && search"
        :value="true"
        color="red"
        icon="new_releases"
      >{{ $i18n.t('UCONTACTX_TABLE.noResultsSearch') }}</v-alert>
      <v-alert
        style="margin: 27px;"
        v-show="!filtered.length && !search"
        :value="true"
        color="red"
        icon="new_releases"
      >{{ $i18n.t('UCONTACTX_TABLE.noData') }}</v-alert>
    </div>

    <v-card
      v-show="pagination"
      flat
      class="x-table__footer"
      :style="{'background-color' : theme.colors.nav, 'color' : theme.colors.navIcons}"
    >
      <v-card-actions v-if="pagination" class="justify-end x-table__pagination">
        <span class="pr-3">{{ $i18n.t('UCONTACTX_TABLE.rowsPage') }}</span>
        <v-select
          :dark="theme.colors.nav != '#fff'"
          class="x-table__select pr-3"
          v-model="pagination.limit"
          :items="filterRows"
        ></v-select>
        <span
          class="px-3"
        >{{ pagination.skip + " - "+ pagination.rowsPage +" / " + pagination.rows }}</span>
        <v-btn
          :disabled="pagination.skip < pagination.limit"
          small
          fab
          flat
          @click.native="previousPage"
          :style="{'color' : theme.colors.nav, 'color' : theme.colors.navIcons}"
        >
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn
          :disabled="pagination.rowsPage == pagination.rows"
          small
          fab
          flat
          @click.native="nextPage"
          :style="{'color' : theme.colors.nav, 'color' : theme.colors.navIcons}"
        >
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ucontactxTable extends Vue {
  @Prop({
    default: {
      headers: [],
      search: { show: false }
    }
  })
  conf!: object;
  @Prop({ default: [] }) items!: object[];
  @Prop({ default: () => [] }) multiple!: object[];
  @Prop({ default: "category" }) itemIcon!: string;
  @Prop({ default: null }) pagination!: any;

  private search: string = "";
  private filters: object = {};
  private ordered: boolean = false;
  private selectedItems: object[] = [];
  private showMultiple: boolean = !!this.multiple.length;

  private filterRows: number[] = [8, 10, 15, 20, 25];

  /**
   * @name FILTERED
   * @desc Returns items filtered by search input
   */
  get filtered() {
    if (!this.pagination) {
      return (this.items || []).filter(item => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }else{
      return this.items;
    }
  }

  /**
   * @name HEADERS_WIDTH
   * @desc Returns items width based on item quantity
   */
  get headersWidth(): number {
    return 100 / this.conf.headers.length;
  }

  /**
   * @name THEME
   * @desc Returns globally stored theme
   */
  get theme(): object {
    return this.$store.state.theme;
  }

  /**
   * @name ON_PAGINATION_LIMIT_CHANGE
   * @desc reset values of pagination where value of limit change
   */
  @Watch("pagination.limit")
  onPaginationLimitChange() {
    this.pagination.skip = 1;
    this.pagination.pageNumber = 1;
    this.pagination.rowsPage = this.pagination.limit;

    if (this.pagination.limit > this.pagination.rows) {
      //limit = 8, totalRows = 3 => rowsPage = 3
      this.pagination.rowsPage = this.pagination.rows;
    }
    this.$emit("get", this.pagination);
  }

  @Watch("items")
  onItemsChange() {
    if(this.pagination) {
      if(this.pagination.limit > this.pagination.rows) {
        this.pagination.rowsPage = this.pagination.rows;
      }        
    }

    this.selectedItems = [];
    if (this.items.length && !this.ordered) {
      this.conf.headers.map(header => {
        if (header.sorted) this.filterAtoZ(header.value);
      }, this);
      this.ordered = true;
    }
  }

  @Watch("search")
  onSearchChange() {
    if (this.pagination) {
      this.pagination.search = this.search;
      if(this.pagination.search == "") this.$emit('get', this.pagination)

    }else{
      this.updateSelection();
    }
  }

  @Watch("selectedItems")
  onSelectedItemsChange() {
    this.$emit("value", this.selectedItems);
  }

  mounted() {
    this.init();
    this.conf.headers.map(header => {
      this.filters[header.value] = false;
    });
  }

  /**
   * @name INIT
   * @desc checks whether the properties sent to the component
   *       are correct
   */
  init() {
    if (!this.conf.headers.length > 0) {
      throw "No headers found in configuration object";
    }
  }

  /**
   * @name OPEN
   * @desc Emits "open" event when table row is clicked
   */
  open(item: object) {
    this.$emit("open", item);
  }

  /**
   * @name ADD
   * @desc Emits "new" event when new button is clicked
   */
  add() {
    this.$emit("new");
  }

  /**
   * @name FILTER_DESC
   * @desc Filters items desc based on row clicked
   */
  filterAtoZ(key: string) {
    this.items.sort((a, b) => {
      return b[key] > a[key] ? -1 : 1;
      return 0;
    });
    this.filters[key] = !this.filters[key];
    this.updateSelection();
  }

  /**
   * @name FILTER_ASC
   * @desc Filters items asc based on row clicked
   */
  filterZtoA(key: string) {
    this.items.sort((a, b) => {
      return b[key] < a[key] ? -1 : 1;
      return 0;
    });
    this.filters[key] = !this.filters[key];
    this.updateSelection();
  }
  /**
   * @name UPDATE_SELECTION
   * @desc Updates selected item reference
   */
  updateSelection() {
    this.selectedItems = Object.assign([], this.selectedItems);
  }
  /**
   * @name PREVIOUS_PAGE
   * @desc change values of pagination to prev page
   */
  previousPage() {
    let p = this.pagination;

    if (p.rowsPage == p.rows) {
      p.pageNumber--;
      p.rowsPage = (p.pageNumber * p.limit);
      p.skip -= p.limit;
    } else {
      p.pageNumber--;
      p.skip -= p.limit;
      p.rowsPage -= p.limit;
    }
    this.pagination = p;
    this.$emit("get", this.pagination);
  }
  /**
   * @name NEXT_PAGE
   * @desc change values of pagination to next page
   */
  nextPage() {
    let p = this.pagination;

    if ((p.pageNumber * p.limit + p.limit) > p.rows) {
      p.skip += p.limit;
      p.rowsPage = p.rows;
      p.pageNumber++;
    } else {
      p.skip += p.limit;
      p.pageNumber++;
      p.rowsPage = p.limit * p.pageNumber;
    }
    this.pagination = p;
    this.$emit("get", this.pagination);
  }

  searchRows() {
    this.$emit("get", this.pagination);
  }
}
</script>

<style scoped lang="scss">
.x-table__add-button {
  position: absolute;
  right: 14px;
  top: 11px;
}

.x-table__search-button {
  position: absolute;
  left: calc(30% - 50px);
  top: 5px;
  min-width: 30px !important;
  min-height: 47px !important;
  .v-icon {    
    color: #bdbdbd !important;
  }
}

.show-multiple {
  position: absolute;
  right: 32px;
  top: 11px;
}

.flechita {
  position: absolute;
  right: 0px;
  top: 11px;
  width: 22px;
  z-index: 2;
  height: 36px;
  padding-top: 5px;
  min-width: 30px !important;
}

.x-table__table-header {
  position: absolute;
  top: 67px;
  width: 100%;
  color: #737373;
  left: 0;
  height: 49px;
  padding-left: 15%;
  font-size: 13px;
  z-index: 1;
  -webkit-box-shadow: 0px 4px 4px -3px #969494;
  box-shadow: 0px 4px 4px -3px #969494;
  background-color: #ffffff;
  border-top: 1px solid #7777772b;
  text-transform: uppercase;

  div {
    width: 24%;
    display: inline-block;
    padding-top: 16px;
    color: #bdbdbd;
  }
}

.x-table__search {
  width: 30%;
}

.x-table__overflow {
  height: calc(82vh - 67px) !important;
  overflow-y: auto;
  padding-bottom: 73px;
  padding-top: 67px;
}

.x-table__item {
  position: relative;
  width: 100%;
  height: 51px;
  border: 1px solid #a7a7a742;
  box-shadow: 0 1px 5px -1px #cecece9e;
  margin-bottom: 11px;
  transition: all 0.3s ease-out;
  border-radius: 7px;

  &:hover {
    background-color: #de56561f;
    box-shadow: 0 1px 12px 2px #fddadc;
    border: 1px solid #f19da259;
    cursor: pointer;
    transform: translateY(-1px);
    transition: all 0.3s ease-out;
  }
}

.x-table__item-pic {
  width: 61px;
  height: 51px;
  margin-top: -1px;
  margin-left: -1px;
  background-color: #de5656;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 1px solid #de5656;

  i {
    color: #fff;
    font-size: 26px;
    padding: 12px;
    padding-left: 16px;
  }
}

.x-table__content {
  position: absolute;
  top: 0;
  width: calc(100% - 58px);
  height: 49px;
  padding-top: 15px;
  text-align: left;
  left: 26px;
  text-transform: uppercase;
  font-size: 13px;
  color: dimgrey;

  div {
    display: inline-block;
    padding-left: 58px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.cards-content {
  height: calc(100% - 67px);
  padding: 50px;
  padding-top: 75px;
  overflow-y: auto;
}

.x-table__header {
  padding-top: 10px !important;
  height: 67px !important;
  padding-left: 20px;
}

.x-table__footer {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  padding-left: calc(100% - 550px);
  border: 1px solid #a7a7a742;
  height: 60px;

  .x-table__pagination {
    position: relative;
    width: 500px;
    height: 50px;
  }

  .x-table__select {
    width: 50px !important;
    flex: none !important;
    margin-top: 10px;

    ::before,
    ::after {
      visibility: hidden;
    }
    .v-input__append-inner {
      margin-top: 20px;
    }
  }
}

.x-table__checkbox {
  position: absolute;
  right: -30px;
  top: -7px;
  padding-left: 15px !important;
}

.x-table__header_arrows {
  font-size: 20px;
  color: #9e9e9e;
  cursor: pointer;
  border-radius: 50%;
  user-select: none;

  &:hover {
    background-color: #17171717;
  }
}
</style>
